# 🐳 Prismscope Dev Container Setup

## What You Get

A complete, isolated development environment with:
- ✅ **Node.js 20** + all dependencies pre-installed
- ✅ **Docker-in-Docker** for container development
- ✅ **Kubernetes tools** (kubectl, Google Cloud CLI)
- ✅ **VS Code extensions** pre-configured
- ✅ **Broken link testing** built-in
- ✅ **CI/CD tools** ready to use
- ✅ **All project scripts** configured

## 🚀 Quick Start (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### 1. Open in Dev Container
```bash
# Open project in VS Code
code .

# VS Code will detect the dev container configuration
# Click "Reopen in Container" when prompted
# OR use Command Palette: "Dev Containers: Reopen in Container"
```

### 2. Automatic Setup
The dev container will automatically:
- Build the development environment
- Install all npm dependencies  
- Configure VS Code settings and extensions
- Set up development tools and aliases

### 3. Start Developing
```bash
# Start the development server
npm run dev:host

# Open browser to http://localhost:3000
# Start coding! 🎉
```

## 🛠️ Manual Docker Setup (Alternative)

If you prefer not to use VS Code Dev Containers:

```bash
# Build the dev container
docker build -t prismscope-dev .devcontainer/

# Run the development environment
docker run -it --rm \
  -v $(pwd):/workspace \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 3000:3000 -p 8080:8080 -p 8081:8081 \
  --network host \
  prismscope-dev bash

# Inside the container
cd /workspace
npm install
npm run dev:host
```

## 🧪 Verify Setup

Run the test script to verify everything is working:

```bash
# Inside the dev container
./scripts/test-devcontainer.sh
```

This will test:
- Node.js and npm versions
- Global development tools
- Docker and Kubernetes access
- Project dependencies
- Network connectivity
- File permissions

## 📊 Development Workflow

### 1. Frontend Development
```bash
# Start development server (auto-reload)
npm run dev:host

# Run linting and formatting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Quality Assurance
```bash
# Check for broken links (local build)
npm run check-links:local

# Check live website
npm run check-links:live

# Run complete test suite
npm run test:all
```

### 3. Container Development
```bash
# Build Docker image
npm run docker:build

# Run Docker container locally
npm run docker:run

# Build and run in one command
npm run docker:dev
```

### 4. Kubernetes Deployment
```bash
# Create static IP address
npm run gcp:static-ip

# Deploy to GKE
npm run k8s:deploy

# Check deployment status
npm run k8s:status

# View application logs
npm run k8s:logs
```

## 🎯 VS Code Integration

### Pre-configured Extensions
- **React Development** - Component intellisense and debugging
- **Tailwind CSS** - Class name completion and validation
- **Docker & Kubernetes** - Container management and deployment
- **Git Integration** - GitLens, GitHub PR/Issues
- **Code Quality** - ESLint, Prettier, spell checking
- **Productivity** - TODO highlights, file icons, themes

### Available Tasks (Ctrl+Shift+P → "Tasks: Run Task")
- **Start Development Server** - Launch Vite dev server
- **Build for Production** - Create optimized build
- **Check Links** - Validate all links with reporting
- **Build Docker Image** - Create container image
- **Deploy to GKE** - Deploy to Kubernetes
- **Full Build and Test** - Complete CI pipeline

### Debug Configurations (F5)
- **Launch Chrome** - Debug React app in browser
- **Debug Link Checker** - Debug link validation script
- **Debug Vite Build** - Debug build process

## 🌐 Port Access

| Port | Service | Access |
|------|---------|--------|
| 3000 | Vite Dev Server | http://localhost:3000 |
| 8080 | Production Preview | http://localhost:8080 |
| 8081 | Container Test | http://localhost:8081 |

All ports are automatically forwarded from the container to your host machine.

## 🔧 Development Tools

### Available in Container
```bash
# Node.js tools
node --version          # Node.js 20
npm --version           # Latest npm
npx vite --version      # Vite build tool

# Development servers
http-server --help      # Static file server
live-server --help      # Live reload server

# Testing tools
broken-link-checker --help    # Link validation
eslint --help                 # Code linting
prettier --help               # Code formatting

# Container tools
docker --version        # Docker CLI
kubectl version         # Kubernetes CLI
gcloud --version        # Google Cloud CLI
gh --version           # GitHub CLI

# System tools
git --version          # Git version control
curl --version         # HTTP client
jq --version          # JSON processor
```

### Helpful Aliases
```bash
ll                     # List files with details
k                      # kubectl shorthand
kns <namespace>        # Set kubectl namespace
docker-build           # Build project Docker image
npm-check             # Check project links
prism-dev             # Start dev server + link check
prism-build           # Build and preview
prism-docker          # Build and run Docker
```

## 🚨 Troubleshooting

### Container Issues
```bash
# Rebuild container from scratch
docker system prune -f
# Reopen in VS Code container

# Check container logs
docker logs <container-id>

# Access container shell
docker exec -it <container-id> bash
```

### Permission Problems
```bash
# Fix workspace permissions
sudo chown -R node:node /workspace
sudo chmod -R 755 /workspace

# Reset npm permissions
npm config set cache /tmp/.npm
```

### Port Conflicts
```bash
# Check what's using a port
sudo netstat -tlnp | grep :3000

# Kill process using port
sudo kill -9 $(sudo lsof -t -i:3000)

# Use alternative ports
npm run dev -- --port 3001
```

### Network Issues
```bash
# Test connectivity
ping google.com
curl -s https://registry.npmjs.org/

# Reset DNS
sudo systemctl restart systemd-resolved
```

## 🔄 Updating the Dev Container

### Update Base Image
1. Edit `.devcontainer/Dockerfile`
2. Change Node.js version or add packages
3. Rebuild: "Dev Containers: Rebuild Container"

### Update Extensions
1. Edit `.devcontainer/devcontainer.json`
2. Add extension IDs to `extensions` array
3. Rebuild container

### Update VS Code Settings
1. Edit `.vscode/settings.json`
2. Changes apply immediately (no rebuild needed)

## 🎉 You're Ready!

Your complete Prismscope development environment is configured! 

### Next Steps:
1. **Start coding**: `npm run dev:host`
2. **Test links**: `npm run check-links`
3. **Build Docker**: `npm run docker:build`
4. **Deploy**: `npm run k8s:deploy`

### Need Help?
- Check the test script: `./scripts/test-devcontainer.sh`
- Read the docs: `.devcontainer/README.md`
- View available tasks: Ctrl+Shift+P → "Tasks"

Happy coding in your containerized environment! 🚀