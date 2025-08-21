#!/bin/bash

# Prismscope Website Deployment Script
# This script builds and deploys the Prismscope website Docker container

set -e

echo "🚀 Starting Prismscope Website Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="prismscope-website"
TAG="latest"
CONTAINER_NAME="prismscope-website"
PORT=${PORT:-8080}

echo -e "${BLUE}Configuration:${NC}"
echo "- Image: ${IMAGE_NAME}:${TAG}"
echo "- Container: ${CONTAINER_NAME}"
echo "- Port: ${PORT}"
echo ""

# Step 1: Build the Docker image
echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker build -t ${IMAGE_NAME}:${TAG} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully${NC}"
else
    echo -e "${RED}❌ Failed to build Docker image${NC}"
    exit 1
fi

# Step 2: Stop and remove existing container if it exists
echo -e "${YELLOW}🛑 Stopping existing container (if any)...${NC}"
docker rm -f ${CONTAINER_NAME} 2>/dev/null || true

# Step 3: Run the new container
echo -e "${YELLOW}🚀 Starting new container...${NC}"
docker run -d \
    --name ${CONTAINER_NAME} \
    -p ${PORT}:80 \
    --restart unless-stopped \
    ${IMAGE_NAME}:${TAG}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Container started successfully${NC}"
else
    echo -e "${RED}❌ Failed to start container${NC}"
    exit 1
fi

# Step 4: Wait for container to be ready
echo -e "${YELLOW}⏳ Waiting for container to be ready...${NC}"
sleep 5

# Step 5: Test the deployment
echo -e "${YELLOW}🧪 Testing deployment...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT} || echo "000")

if [ "${HTTP_CODE}" = "200" ]; then
    echo -e "${GREEN}✅ Website is accessible${NC}"
    
    # Test health endpoint
    HEALTH_STATUS=$(curl -s http://localhost:${PORT}/health || echo "unhealthy")
    if [[ "${HEALTH_STATUS}" == *"healthy"* ]]; then
        echo -e "${GREEN}✅ Health check passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Health check returned: ${HEALTH_STATUS}${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}Website URL: http://localhost:${PORT}${NC}"
    echo -e "${BLUE}Health Check: http://localhost:${PORT}/health${NC}"
    
else
    echo -e "${RED}❌ Website is not accessible (HTTP ${HTTP_CODE})${NC}"
    echo -e "${YELLOW}📋 Container logs:${NC}"
    docker logs ${CONTAINER_NAME}
    exit 1
fi

echo ""
echo -e "${BLUE}📊 Container Status:${NC}"
docker ps | grep ${CONTAINER_NAME} || echo "Container not found in running processes"

echo ""
echo -e "${BLUE}💡 Useful Commands:${NC}"
echo "- View logs: docker logs ${CONTAINER_NAME}"
echo "- Stop container: docker stop ${CONTAINER_NAME}"
echo "- Remove container: docker rm ${CONTAINER_NAME}"
echo "- Enter container: docker exec -it ${CONTAINER_NAME} sh"