# Prismscope Website - Docker Deployment Guide

## 🚀 Quick Deployment

The fastest way to deploy the Prismscope website is using the included deployment script:

```bash
./deploy.sh
```

This will:
1. Build the Docker image
2. Stop any existing container
3. Start a new container on port 8080
4. Run health checks
5. Display deployment status

### Custom Port
```bash
PORT=3030 ./deploy.sh
```

## 🐳 Docker Image Details

### Multi-Stage Build
- **Stage 1**: Node.js Alpine for building the React application
- **Stage 2**: Nginx Alpine for serving static files

### Image Size Optimization
- Uses Alpine Linux for minimal footprint
- Multi-stage build discards Node.js and build dependencies
- Final image contains only nginx and static files
- Optimized with `.dockerignore` to exclude unnecessary files

### Security Features
- Security headers configured in nginx
- Content Security Policy (CSP) enabled
- X-Frame-Options, X-Content-Type-Options headers
- No root user execution (nginx user)

## 🔧 Container Configuration

### Ports
- **Container Port**: 80 (nginx)
- **Host Port**: Configurable (default 8080)

### Health Check
- **Endpoint**: `/health`
- **Interval**: 30 seconds
- **Timeout**: 3 seconds
- **Retries**: 3

### Performance Features
- **Gzip Compression**: Enabled for all text-based files
- **Static Asset Caching**: 1 year cache for JS/CSS/images
- **HTML Caching**: 1 hour cache with validation

## 📋 Deployment Options

### 1. Script Deployment (Recommended)
```bash
./deploy.sh
```

### 2. Manual Docker Commands
```bash
# Build
docker build -t prismscope-website:latest .

# Run
docker run -d \
  --name prismscope-website \
  -p 8080:80 \
  --restart unless-stopped \
  prismscope-website:latest
```

### 3. Docker Compose - Development
```bash
docker-compose up -d
```

### 4. Docker Compose - Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🌐 Production Deployment

### Cloud Platforms

#### Azure Container Instances
```bash
# Build and push to Azure Container Registry
docker build -t myregistry.azurecr.io/prismscope-website:latest .
docker push myregistry.azurecr.io/prismscope-website:latest

# Deploy to ACI
az container create \
  --resource-group myResourceGroup \
  --name prismscope-website \
  --image myregistry.azurecr.io/prismscope-website:latest \
  --ports 80 \
  --dns-name-label prismscope-demo
```

#### AWS ECS
```bash
# Tag for ECR
docker tag prismscope-website:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/prismscope-website:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/prismscope-website:latest
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/prismscope-website
gcloud run deploy --image gcr.io/PROJECT-ID/prismscope-website --platform managed
```

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prismscope-website
spec:
  replicas: 3
  selector:
    matchLabels:
      app: prismscope-website
  template:
    metadata:
      labels:
        app: prismscope-website
    spec:
      containers:
      - name: website
        image: prismscope-website:latest
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 250m
            memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: prismscope-website-service
spec:
  selector:
    app: prismscope-website
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

## 🔍 Testing & Monitoring

### Health Checks
```bash
# Basic health check
curl http://localhost:8080/health

# Detailed response check
curl -v http://localhost:8080

# Check security headers
curl -I http://localhost:8080
```

### Performance Testing
```bash
# Load testing with Apache Bench
ab -n 1000 -c 10 http://localhost:8080/

# Check compression
curl -H "Accept-Encoding: gzip" -v http://localhost:8080/
```

### Container Monitoring
```bash
# View logs
docker logs prismscope-website

# Monitor resource usage
docker stats prismscope-website

# Execute commands in container
docker exec -it prismscope-website sh
```

## 🛠 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
lsof -i :8080

# Use different port
PORT=9090 ./deploy.sh
```

#### Container Won't Start
```bash
# Check logs
docker logs prismscope-website

# Check if image built correctly
docker images | grep prismscope

# Rebuild without cache
docker build --no-cache -t prismscope-website:latest .
```

#### Health Check Failing
```bash
# Test nginx config
docker exec prismscope-website nginx -t

# Check if files are present
docker exec prismscope-website ls -la /usr/share/nginx/html/
```

### Debug Mode
```bash
# Run container in interactive mode
docker run -it --rm -p 8080:80 prismscope-website:latest sh

# Check nginx configuration
docker exec prismscope-website cat /etc/nginx/conf.d/default.conf
```

## 📈 Performance Tuning

### Nginx Optimization
The container includes optimized nginx configuration:
- Worker processes auto-tuned to CPU cores
- Gzip compression for all text content
- Static asset caching with immutable headers
- Security headers for enhanced protection

### Resource Limits
Production recommendations:
- **CPU**: 0.5 cores limit, 0.25 cores request
- **Memory**: 512MB limit, 256MB request
- **Replicas**: 2-3 for high availability

## 🔒 Security Considerations

### Headers Configured
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy` with restricted sources

### Best Practices
- Container runs as non-root nginx user
- Minimal Alpine Linux base image
- No sensitive data in container
- Regular security updates via base image updates

## 📝 Maintenance

### Updates
```bash
# Pull latest base images
docker pull node:18-alpine
docker pull nginx:alpine

# Rebuild with latest dependencies
docker build --no-cache -t prismscope-website:latest .

# Rolling update
./deploy.sh
```

### Backup
```bash
# Export container
docker save prismscope-website:latest > prismscope-website.tar

# Import on another system
docker load < prismscope-website.tar
```