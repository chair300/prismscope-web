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

# Production stage - Node.js with built app
FROM node:18-alpine

# Create non-root user for security
RUN addgroup -g 1001 -S appuser && \
    adduser -S -D -H -u 1001 -h /app -s /sbin/nologin -G appuser -g appuser appuser

# Update packages for security
RUN apk update && apk upgrade && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application and server
COPY --from=build --chown=appuser:appuser /app/dist ./dist
COPY --chown=appuser:appuser api-server.js ./

# Create security.txt for responsible disclosure
RUN echo -e "Contact: harrison@provoco.ai\nExpires: 2025-12-31T23:59:59Z\nPreferred-Languages: en\nCanonical: https://prismscope.ai/.well-known/security.txt" > ./dist/security.txt

# Set proper permissions
RUN chown -R appuser:appuser /app && \
    chmod -R 755 /app

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Start the server
CMD ["npm", "start"]