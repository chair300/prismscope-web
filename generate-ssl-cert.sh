#!/bin/bash

# SSL Certificate Generation Script for Prismscope
# Supports both Let's Encrypt (production) and self-signed (development)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${DOMAIN:-"prismscope.ai"}
EMAIL=${EMAIL:-"harrison@prismscope.ai"}
SSL_DIR="./ssl"
CERT_TYPE=${1:-"letsencrypt"}

# Create SSL directory
mkdir -p ${SSL_DIR}

echo -e "${GREEN}SSL Certificate Generation Script${NC}"
echo "Domain: ${DOMAIN}"
echo "Certificate Type: ${CERT_TYPE}"
echo ""

case ${CERT_TYPE} in
    "letsencrypt")
        echo -e "${GREEN}Generating Let's Encrypt Certificate...${NC}"
        
        # Check if certbot is installed
        if ! command -v certbot &> /dev/null; then
            echo -e "${YELLOW}Certbot not found. Installing...${NC}"
            if [[ "$OSTYPE" == "linux-gnu"* ]]; then
                sudo apt-get update
                sudo apt-get install -y certbot
            elif [[ "$OSTYPE" == "darwin"* ]]; then
                brew install certbot
            else
                echo -e "${RED}Please install certbot manually${NC}"
                exit 1
            fi
        fi
        
        # Stop any running containers on port 80
        echo -e "${YELLOW}Stopping any services on port 80...${NC}"
        docker-compose down 2>/dev/null || true
        
        # Generate certificate using standalone mode
        sudo certbot certonly \
            --standalone \
            --preferred-challenges http \
            --email ${EMAIL} \
            --agree-tos \
            --no-eff-email \
            --force-renewal \
            -d ${DOMAIN} \
            -d www.${DOMAIN}
        
        # Copy certificates to project SSL directory
        echo -e "${YELLOW}Copying certificates to project directory...${NC}"
        sudo cp /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ${SSL_DIR}/
        sudo cp /etc/letsencrypt/live/${DOMAIN}/privkey.pem ${SSL_DIR}/
        sudo cp /etc/letsencrypt/live/${DOMAIN}/chain.pem ${SSL_DIR}/
        
        # Set proper permissions
        sudo chown -R $USER:$USER ${SSL_DIR}
        chmod 600 ${SSL_DIR}/privkey.pem
        chmod 644 ${SSL_DIR}/fullchain.pem
        chmod 644 ${SSL_DIR}/chain.pem
        
        echo -e "${GREEN}Let's Encrypt certificate generated successfully!${NC}"
        echo -e "${YELLOW}Certificate will expire in 90 days. Set up auto-renewal with:${NC}"
        echo "sudo crontab -e"
        echo "0 0 1 * * certbot renew --post-hook 'cp /etc/letsencrypt/live/${DOMAIN}/*.pem ${PWD}/ssl/'"
        ;;
        
    "self-signed")
        echo -e "${GREEN}Generating Self-Signed Certificate...${NC}"
        
        # Generate private key
        openssl genrsa -out ${SSL_DIR}/privkey.pem 4096
        
        # Generate certificate signing request
        openssl req -new -key ${SSL_DIR}/privkey.pem \
            -out ${SSL_DIR}/csr.pem \
            -subj "/C=US/ST=State/L=City/O=Prismscope/CN=${DOMAIN}"
        
        # Generate self-signed certificate (valid for 365 days)
        openssl x509 -req -days 365 \
            -in ${SSL_DIR}/csr.pem \
            -signkey ${SSL_DIR}/privkey.pem \
            -out ${SSL_DIR}/fullchain.pem
        
        # Copy fullchain as chain for consistency
        cp ${SSL_DIR}/fullchain.pem ${SSL_DIR}/chain.pem
        
        # Clean up CSR
        rm ${SSL_DIR}/csr.pem
        
        echo -e "${GREEN}Self-signed certificate generated successfully!${NC}"
        echo -e "${YELLOW}Warning: This certificate is for development only!${NC}"
        ;;
        
    "docker-letsencrypt")
        echo -e "${GREEN}Generating Let's Encrypt Certificate with Docker...${NC}"
        
        # Create directories for certbot
        mkdir -p ./certbot/conf
        mkdir -p ./certbot/www
        
        # Use docker-compose with certbot
        cat > docker-compose.certbot.yml << EOF
version: '3.8'

services:
  nginx-certbot:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./certbot/www:/var/www/certbot:ro
      - ./nginx-certbot.conf:/etc/nginx/conf.d/default.conf:ro
    command: "/bin/sh -c 'nginx -g \"daemon off;\"'"
    
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait \$\${!}; done;'"
EOF

        # Create temporary nginx config for certbot
        cat > nginx-certbot.conf << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}
EOF
        
        # Start nginx for challenge
        docker-compose -f docker-compose.certbot.yml up -d nginx-certbot
        
        # Request certificate
        docker-compose -f docker-compose.certbot.yml run --rm certbot certonly \
            --webroot \
            --webroot-path=/var/www/certbot \
            --email ${EMAIL} \
            --agree-tos \
            --no-eff-email \
            --force-renewal \
            -d ${DOMAIN} \
            -d www.${DOMAIN}
        
        # Copy certificates to SSL directory
        cp ./certbot/conf/live/${DOMAIN}/fullchain.pem ${SSL_DIR}/
        cp ./certbot/conf/live/${DOMAIN}/privkey.pem ${SSL_DIR}/
        cp ./certbot/conf/live/${DOMAIN}/chain.pem ${SSL_DIR}/
        
        # Clean up
        docker-compose -f docker-compose.certbot.yml down
        rm docker-compose.certbot.yml nginx-certbot.conf
        
        echo -e "${GREEN}Let's Encrypt certificate generated with Docker!${NC}"
        ;;
        
    *)
        echo -e "${RED}Invalid certificate type. Use: letsencrypt, self-signed, or docker-letsencrypt${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Certificate files created in ${SSL_DIR}:${NC}"
ls -la ${SSL_DIR}/

echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Update docker-compose.prod.yml to mount SSL certificates"
echo "2. Use nginx-ssl.conf for SSL-enabled nginx configuration"
echo "3. Run: docker-compose -f docker-compose.prod.yml up -d"
echo ""
echo -e "${YELLOW}For production, ensure DNS A records point to your server IP:${NC}"
echo "  ${DOMAIN} -> YOUR_SERVER_IP"
echo "  www.${DOMAIN} -> YOUR_SERVER_IP"