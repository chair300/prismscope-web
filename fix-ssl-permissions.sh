#!/bin/bash

# Fix SSL Certificate Permissions Script
# Resolves the root ownership issue when certbot creates certificates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${DOMAIN:-"prismscope.ai"}
SSL_DIR="./ssl"
CERTBOT_DIR="./certbot"
CURRENT_USER=$(whoami)
CURRENT_GROUP=$(id -gn)

echo -e "${GREEN}SSL Certificate Permission Fix Script${NC}"
echo "Domain: ${DOMAIN}"
echo "User: ${CURRENT_USER}:${CURRENT_GROUP}"
echo ""

# Method 1: Fix existing certificates created by Docker certbot
fix_docker_certs() {
    echo -e "${YELLOW}Fixing permissions for Docker-generated certificates...${NC}"
    
    # Check if certbot directory exists
    if [ -d "${CERTBOT_DIR}/conf/live/${DOMAIN}" ]; then
        echo "Found certificates in ${CERTBOT_DIR}/conf/live/${DOMAIN}"
        
        # Copy certificates with proper ownership
        sudo cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/fullchain.pem ${SSL_DIR}/fullchain.pem
        sudo cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/privkey.pem ${SSL_DIR}/privkey.pem
        sudo cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/chain.pem ${SSL_DIR}/chain.pem 2>/dev/null || \
            sudo cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/cert.pem ${SSL_DIR}/chain.pem
        
        # Fix ownership
        sudo chown ${CURRENT_USER}:${CURRENT_GROUP} ${SSL_DIR}/*.pem
        
        # Set proper permissions
        chmod 644 ${SSL_DIR}/fullchain.pem
        chmod 600 ${SSL_DIR}/privkey.pem
        chmod 644 ${SSL_DIR}/chain.pem
        
        echo -e "${GREEN}Permissions fixed successfully!${NC}"
    else
        echo -e "${RED}No Docker certificates found in ${CERTBOT_DIR}/conf/live/${DOMAIN}${NC}"
        return 1
    fi
}

# Method 2: Fix system-wide Let's Encrypt certificates
fix_system_certs() {
    echo -e "${YELLOW}Fixing permissions for system Let's Encrypt certificates...${NC}"
    
    if [ -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
        echo "Found certificates in /etc/letsencrypt/live/${DOMAIN}"
        
        # Create SSL directory if it doesn't exist
        mkdir -p ${SSL_DIR}
        
        # Copy certificates with proper ownership
        sudo cp -L /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ${SSL_DIR}/fullchain.pem
        sudo cp -L /etc/letsencrypt/live/${DOMAIN}/privkey.pem ${SSL_DIR}/privkey.pem
        sudo cp -L /etc/letsencrypt/live/${DOMAIN}/chain.pem ${SSL_DIR}/chain.pem
        
        # Fix ownership
        sudo chown ${CURRENT_USER}:${CURRENT_GROUP} ${SSL_DIR}/*.pem
        
        # Set proper permissions
        chmod 644 ${SSL_DIR}/fullchain.pem
        chmod 600 ${SSL_DIR}/privkey.pem
        chmod 644 ${SSL_DIR}/chain.pem
        
        echo -e "${GREEN}Permissions fixed successfully!${NC}"
    else
        echo -e "${RED}No system certificates found in /etc/letsencrypt/live/${DOMAIN}${NC}"
        return 1
    fi
}

# Main execution
echo -e "${YELLOW}Checking for certificates...${NC}"

# Try Docker certificates first
if fix_docker_certs; then
    echo -e "${GREEN}Docker certificates processed${NC}"
elif fix_system_certs; then
    echo -e "${GREEN}System certificates processed${NC}"
else
    echo -e "${RED}No certificates found. Please generate certificates first.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Certificate files in ${SSL_DIR}:${NC}"
ls -la ${SSL_DIR}/*.pem

echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Certificates are now readable by your user"
echo "2. Docker containers can mount these certificates"
echo "3. Run: docker-compose -f docker-compose.ssl.yml up -d"