#!/bin/bash

# Enhanced SSL Certificate Generation Script with Permission Management
# Generates Let's Encrypt certificates using Docker without root ownership issues

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
CERTBOT_DIR="./certbot"

# Get current user UID and GID for Docker
export UID=$(id -u)
export GID=$(id -g)

echo -e "${GREEN}Docker-based SSL Certificate Generation (Non-Root)${NC}"
echo "Domain: ${DOMAIN}"
echo "Email: ${EMAIL}"
echo "Running as UID:GID = ${UID}:${GID}"
echo ""

# Create necessary directories with correct permissions
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p ${SSL_DIR}
mkdir -p ${CERTBOT_DIR}/conf
mkdir -p ${CERTBOT_DIR}/www
mkdir -p ${CERTBOT_DIR}/logs

# Set proper ownership on directories
chown -R ${UID}:${GID} ${SSL_DIR} ${CERTBOT_DIR}

# Create nginx configuration for HTTP challenge
echo -e "${YELLOW}Creating nginx configuration...${NC}"
cat > nginx-certbot.conf << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://\$host\$request_uri;
    }
}
EOF

# Stop any services using port 80
echo -e "${YELLOW}Stopping any services on port 80...${NC}"
docker-compose down 2>/dev/null || true
docker stop $(docker ps -q --filter "publish=80") 2>/dev/null || true

# Start nginx for the HTTP challenge
echo -e "${GREEN}Starting nginx for HTTP challenge...${NC}"
docker-compose -f docker-compose.certbot.yml up -d nginx-certbot

# Wait for nginx to be ready
sleep 3

# Generate certificate using Docker certbot
echo -e "${GREEN}Requesting Let's Encrypt certificate...${NC}"

# Run certbot with explicit user mapping to avoid root ownership
docker run --rm \
    --name certbot-temp \
    --user "${UID}:${GID}" \
    -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
    -v "$(pwd)/certbot/www:/var/www/certbot" \
    -v "$(pwd)/certbot/logs:/var/log/letsencrypt" \
    --network "$(basename $(pwd))_certbot-network" \
    certbot/certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email ${EMAIL} \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d ${DOMAIN} \
        -d www.${DOMAIN}

# Check if certificate was generated successfully
if [ -f "${CERTBOT_DIR}/conf/live/${DOMAIN}/fullchain.pem" ]; then
    echo -e "${GREEN}Certificate generated successfully!${NC}"
    
    # Copy certificates to SSL directory with proper permissions
    echo -e "${YELLOW}Copying certificates to ${SSL_DIR}...${NC}"
    cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/fullchain.pem ${SSL_DIR}/
    cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/privkey.pem ${SSL_DIR}/
    cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/chain.pem ${SSL_DIR}/ 2>/dev/null || \
        cp -L ${CERTBOT_DIR}/conf/live/${DOMAIN}/cert.pem ${SSL_DIR}/chain.pem
    
    # Set secure permissions
    chmod 644 ${SSL_DIR}/fullchain.pem
    chmod 600 ${SSL_DIR}/privkey.pem
    chmod 644 ${SSL_DIR}/chain.pem
    
    echo -e "${GREEN}Certificates copied to ${SSL_DIR}${NC}"
else
    echo -e "${RED}Certificate generation failed!${NC}"
    echo "Check logs in ${CERTBOT_DIR}/logs/"
    docker-compose -f docker-compose.certbot.yml down
    exit 1
fi

# Stop the temporary nginx container
echo -e "${YELLOW}Cleaning up...${NC}"
docker-compose -f docker-compose.certbot.yml down

# Show certificate details
echo ""
echo -e "${GREEN}Certificate files created:${NC}"
ls -la ${SSL_DIR}/*.pem

echo ""
echo -e "${GREEN}Certificate information:${NC}"
openssl x509 -in ${SSL_DIR}/fullchain.pem -noout -dates

# Setup auto-renewal with cron
echo ""
echo -e "${YELLOW}Setting up auto-renewal...${NC}"
CRON_SCRIPT="$(pwd)/renew-ssl-cert.sh"

# Create renewal script
cat > ${CRON_SCRIPT} << 'EOF'
#!/bin/bash
cd $(dirname "$0")
export UID=$(id -u)
export GID=$(id -g)

# Run certbot renewal
docker run --rm \
    --user "${UID}:${GID}" \
    -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
    -v "$(pwd)/certbot/www:/var/www/certbot" \
    -v "$(pwd)/certbot/logs:/var/log/letsencrypt" \
    certbot/certbot renew \
        --webroot \
        --webroot-path=/var/www/certbot \
        --quiet

# Copy renewed certificates if successful
if [ $? -eq 0 ]; then
    cp -L ./certbot/conf/live/*/fullchain.pem ./ssl/
    cp -L ./certbot/conf/live/*/privkey.pem ./ssl/
    cp -L ./certbot/conf/live/*/chain.pem ./ssl/ 2>/dev/null || \
        cp -L ./certbot/conf/live/*/cert.pem ./ssl/chain.pem
    
    # Reload nginx if running
    docker exec prismscope-website-ssl nginx -s reload 2>/dev/null || true
fi
EOF

chmod +x ${CRON_SCRIPT}

echo -e "${GREEN}Next steps:${NC}"
echo "1. Start your application with SSL:"
echo "   docker-compose -f docker-compose.ssl.yml up -d"
echo ""
echo "2. Add auto-renewal to crontab:"
echo "   crontab -e"
echo "   0 2 * * * ${CRON_SCRIPT}"
echo ""
echo "3. Verify SSL configuration:"
echo "   curl https://${DOMAIN}"
echo ""
echo -e "${GREEN}SSL setup complete!${NC}"