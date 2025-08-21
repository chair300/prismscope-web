# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and run security audit
RUN npm ci && npm audit --audit-level=high

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - Use minimal nginx alpine
FROM nginx:alpine

# Create non-root user for Kubernetes security
RUN addgroup -g 1001 -S appuser && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G appuser -g appuser appuser

# Update packages and install minimal security tools
RUN apk update && apk upgrade && \
    apk add --no-cache wget && \
    rm -rf /var/cache/apk/*

# Create directories with proper ownership for non-root operation
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run /tmp/nginx && \
    chown -R appuser:appuser /var/cache/nginx /var/log/nginx /var/run /etc/nginx /usr/share/nginx/html /tmp/nginx

# Copy built application with proper ownership
COPY --from=build --chown=appuser:appuser /app/dist /usr/share/nginx/html

# Create minimal nginx config for Kubernetes (ingress handles SSL/routing)
RUN echo 'worker_processes auto; \
error_log /var/log/nginx/error.log warn; \
pid /tmp/nginx/nginx.pid; \
events { worker_connections 1024; use epoll; multi_accept on; } \
http { \
    include /etc/nginx/mime.types; \
    default_type application/octet-stream; \
    sendfile on; \
    tcp_nopush on; \
    tcp_nodelay on; \
    keepalive_timeout 65; \
    server_tokens off; \
    client_max_body_size 1m; \
    client_body_temp_path /tmp/nginx/client_temp; \
    proxy_temp_path /tmp/nginx/proxy_temp; \
    fastcgi_temp_path /tmp/nginx/fastcgi_temp; \
    uwsgi_temp_path /tmp/nginx/uwsgi_temp; \
    scgi_temp_path /tmp/nginx/scgi_temp; \
    gzip on; \
    gzip_vary on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
    server { \
        listen 8080; \
        server_name _; \
        root /usr/share/nginx/html; \
        index index.html; \
        location / { try_files $uri $uri/ /index.html; } \
        location /health { access_log off; return 200 "healthy\\n"; add_header Content-Type text/plain; } \
        location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
            expires 1y; \
            add_header Cache-Control "public, immutable"; \
            access_log off; \
        } \
    } \
}' > /etc/nginx/nginx.conf

# Create security.txt for responsible disclosure
RUN echo -e "Contact: harrison@provoco.ai\nExpires: 2025-12-31T23:59:59Z\nPreferred-Languages: en\nCanonical: https://prismscope.ai/.well-known/security.txt" > /usr/share/nginx/html/security.txt

# Set secure permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chmod 644 /etc/nginx/nginx.conf && \
    chmod 644 /usr/share/nginx/html/security.txt

# Health check for Kubernetes readiness/liveness probes
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Switch to non-root user (required for Kubernetes security policies)
USER appuser

# Expose non-privileged port
EXPOSE 8080

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]