#!/bin/bash

# Secondary Server Deployment Script for Prismscope
# This script handles the complete deployment including SSL certificate generation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration (can be overridden with environment variables)
DOMAIN=${DOMAIN:-"prismscope.ai"}
EMAIL=${EMAIL:-"harrison@prismscope.ai"}
SSL_TYPE=${SSL_TYPE:-"self-signed"}  # Options: letsencrypt, self-signed
DEPLOYMENT_TYPE=${DEPLOYMENT_TYPE:-"ssl"}  # Options: basic, ssl, prod

echo -e "${BLUE}=== Prismscope Secondary Server Deployment ===${NC}"
echo -e "${BLUE}Domain: ${DOMAIN}${NC}"
echo -e "${BLUE}SSL Type: ${SSL_TYPE}${NC}"
echo -e "${BLUE}Deployment Type: ${DEPLOYMENT_TYPE}${NC}"
echo ""

# Function to check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed${NC}"
        echo "Please install Docker first: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose is not installed${NC}"
        echo "Please install Docker Compose first: https://docs.docker.com/compose/install/"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Prerequisites check passed${NC}"
}

# Function to generate SSL certificates
generate_ssl_certificates() {
    echo -e "${YELLOW}🔐 Generating SSL certificates...${NC}"
    
    # Create SSL directory
    mkdir -p ./ssl
    
    case ${SSL_TYPE} in
        "letsencrypt")
            echo -e "${BLUE}Using Let's Encrypt for production SSL${NC}"
            
            # Check if port 80 is available
            if lsof -i:80 &> /dev/null; then
                echo -e "${YELLOW}Port 80 is in use. Stopping existing services...${NC}"
                docker-compose down 2>/dev/null || true
                sleep 2
            fi
            
            # Use Docker to generate Let's Encrypt certificates
            docker run -it --rm \
                -p 80:80 \
                -v $(pwd)/ssl:/etc/letsencrypt \
                certbot/certbot certonly \
                --standalone \
                --preferred-challenges http \
                --email ${EMAIL} \
                --agree-tos \
                --no-eff-email \
                --non-interactive \
                -d ${DOMAIN} \
                -d www.${DOMAIN}
            
            # Move certificates to expected locations
            if [ -d "./ssl/live/${DOMAIN}" ]; then
                cp ./ssl/live/${DOMAIN}/fullchain.pem ./ssl/
                cp ./ssl/live/${DOMAIN}/privkey.pem ./ssl/
                cp ./ssl/live/${DOMAIN}/chain.pem ./ssl/
                echo -e "${GREEN}✅ Let's Encrypt certificates generated${NC}"
            else
                echo -e "${RED}❌ Failed to generate Let's Encrypt certificates${NC}"
                echo -e "${YELLOW}Falling back to self-signed certificates...${NC}"
                SSL_TYPE="self-signed"
                generate_self_signed_cert
            fi
            ;;
            
        "self-signed"|*)
            generate_self_signed_cert
            ;;
    esac
}

# Function to generate self-signed certificate
generate_self_signed_cert() {
    echo -e "${BLUE}Generating self-signed certificate for development/testing${NC}"
    
    # Generate private key
    openssl genrsa -out ./ssl/privkey.pem 4096
    
    # Generate certificate
    openssl req -new -x509 -days 365 \
        -key ./ssl/privkey.pem \
        -out ./ssl/fullchain.pem \
        -subj "/C=US/ST=State/L=City/O=Prismscope/CN=${DOMAIN}"
    
    # Copy as chain for compatibility
    cp ./ssl/fullchain.pem ./ssl/chain.pem
    
    echo -e "${GREEN}✅ Self-signed certificate generated${NC}"
    echo -e "${YELLOW}⚠️  Warning: Browsers will show security warnings with self-signed certificates${NC}"
}

# Function to build Docker image
build_docker_image() {
    echo -e "${YELLOW}🔨 Building Docker image...${NC}"
    
    docker build -t prismscope-website:latest .
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Docker image built successfully${NC}"
    else
        echo -e "${RED}❌ Failed to build Docker image${NC}"
        exit 1
    fi
}

# Function to deploy with appropriate configuration
deploy_application() {
    echo -e "${YELLOW}🚀 Deploying application...${NC}"
    
    # Stop existing containers
    echo -e "${BLUE}Stopping existing containers...${NC}"
    docker-compose down 2>/dev/null || true
    docker-compose -f docker-compose.ssl.yml down 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # Deploy based on type
    case ${DEPLOYMENT_TYPE} in
        "ssl")
            echo -e "${BLUE}Deploying with SSL configuration...${NC}"
            docker-compose -f docker-compose.ssl.yml up -d
            HEALTH_URL="https://localhost/health"
            APP_URL="https://${DOMAIN}"
            ;;
            
        "prod")
            echo -e "${BLUE}Deploying with production configuration...${NC}"
            docker-compose -f docker-compose.prod.yml up -d
            HEALTH_URL="http://localhost/health"
            APP_URL="http://${DOMAIN}"
            ;;
            
        "basic"|*)
            echo -e "${BLUE}Deploying with basic configuration...${NC}"
            docker-compose up -d
            HEALTH_URL="http://localhost:8080/health"
            APP_URL="http://${DOMAIN}:8080"
            ;;
    esac
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Application deployed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to deploy application${NC}"
        exit 1
    fi
}

# Function to verify deployment
verify_deployment() {
    echo -e "${YELLOW}🔍 Verifying deployment...${NC}"
    
    # Wait for container to be ready
    echo -e "${BLUE}Waiting for application to start...${NC}"
    sleep 10
    
    # Check container status
    echo -e "${BLUE}Container status:${NC}"
    docker ps | grep prismscope || echo "No running containers found"
    
    # Test health endpoint (with self-signed cert support)
    echo -e "${BLUE}Testing health endpoint...${NC}"
    if [[ ${DEPLOYMENT_TYPE} == "ssl" ]]; then
        # Use curl with -k flag for self-signed certificates
        HEALTH_RESPONSE=$(curl -sk ${HEALTH_URL} 2>/dev/null || echo "failed")
    else
        HEALTH_RESPONSE=$(curl -s ${HEALTH_URL} 2>/dev/null || echo "failed")
    fi
    
    if [[ "${HEALTH_RESPONSE}" == *"healthy"* ]] || [[ "${HEALTH_RESPONSE}" == *"OK"* ]]; then
        echo -e "${GREEN}✅ Health check passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Health check response: ${HEALTH_RESPONSE}${NC}"
        echo -e "${BLUE}Container logs:${NC}"
        docker-compose logs --tail=20
    fi
}

# Function to setup auto-renewal for Let's Encrypt
setup_auto_renewal() {
    if [[ ${SSL_TYPE} == "letsencrypt" ]]; then
        echo -e "${YELLOW}📅 Setting up certificate auto-renewal...${NC}"
        
        # Create renewal script
        cat > renew-ssl.sh << 'EOF'
#!/bin/bash
docker run -it --rm \
    -v $(pwd)/ssl:/etc/letsencrypt \
    certbot/certbot renew --quiet
    
if [ $? -eq 0 ]; then
    # Copy renewed certificates
    cp ./ssl/live/*/fullchain.pem ./ssl/
    cp ./ssl/live/*/privkey.pem ./ssl/
    cp ./ssl/live/*/chain.pem ./ssl/
    
    # Restart container
    docker-compose -f docker-compose.ssl.yml restart
fi
EOF
        chmod +x renew-ssl.sh
        
        echo -e "${GREEN}✅ Renewal script created: ./renew-ssl.sh${NC}"
        echo -e "${BLUE}Add to crontab for automatic renewal:${NC}"
        echo "0 2 * * * cd $(pwd) && ./renew-ssl.sh"
    fi
}

# Function to display summary
display_summary() {
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}🎉 Deployment Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${BLUE}📋 Deployment Summary:${NC}"
    echo -e "  • Domain: ${DOMAIN}"
    echo -e "  • SSL Type: ${SSL_TYPE}"
    echo -e "  • Deployment Type: ${DEPLOYMENT_TYPE}"
    echo -e "  • Application URL: ${APP_URL}"
    echo ""
    echo -e "${BLUE}🔧 Useful Commands:${NC}"
    echo -e "  • View logs: docker-compose -f docker-compose.${DEPLOYMENT_TYPE}.yml logs -f"
    echo -e "  • Stop: docker-compose -f docker-compose.${DEPLOYMENT_TYPE}.yml down"
    echo -e "  • Restart: docker-compose -f docker-compose.${DEPLOYMENT_TYPE}.yml restart"
    echo -e "  • Status: docker-compose -f docker-compose.${DEPLOYMENT_TYPE}.yml ps"
    echo ""
    
    if [[ ${SSL_TYPE} == "self-signed" ]]; then
        echo -e "${YELLOW}⚠️  Note: Using self-signed certificate. Browsers will show security warnings.${NC}"
        echo -e "${YELLOW}    For production, use: SSL_TYPE=letsencrypt ./deploy-secondary-server.sh${NC}"
    fi
}

# Main deployment flow
main() {
    echo -e "${GREEN}Starting deployment process...${NC}"
    echo ""
    
    # Run deployment steps
    check_prerequisites
    
    # Only generate SSL if deploying with SSL
    if [[ ${DEPLOYMENT_TYPE} == "ssl" ]]; then
        generate_ssl_certificates
    fi
    
    build_docker_image
    deploy_application
    verify_deployment
    
    # Setup auto-renewal if using Let's Encrypt
    if [[ ${SSL_TYPE} == "letsencrypt" ]] && [[ ${DEPLOYMENT_TYPE} == "ssl" ]]; then
        setup_auto_renewal
    fi
    
    display_summary
}

# Handle script arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --domain)
            DOMAIN="$2"
            shift 2
            ;;
        --email)
            EMAIL="$2"
            shift 2
            ;;
        --ssl-type)
            SSL_TYPE="$2"
            shift 2
            ;;
        --deployment-type)
            DEPLOYMENT_TYPE="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --domain DOMAIN           Domain name (default: prismscope.ai)"
            echo "  --email EMAIL            Email for Let's Encrypt (default: harrison@prismscope.ai)"
            echo "  --ssl-type TYPE          SSL type: letsencrypt or self-signed (default: self-signed)"
            echo "  --deployment-type TYPE   Deployment type: basic, ssl, or prod (default: ssl)"
            echo "  --help                   Show this help message"
            echo ""
            echo "Examples:"
            echo "  # Deploy with self-signed certificate"
            echo "  $0"
            echo ""
            echo "  # Deploy with Let's Encrypt"
            echo "  $0 --ssl-type letsencrypt --domain yourdomain.com --email you@email.com"
            echo ""
            echo "  # Basic deployment without SSL"
            echo "  $0 --deployment-type basic"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Run main deployment
main