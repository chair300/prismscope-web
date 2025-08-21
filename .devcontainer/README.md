# 🐳 Prismscope Dev Container

## Overview

This dev container provides a complete, isolated development environment for the Prismscope website with all necessary tools pre-configured.

## 🚀 Quick Start

### Option 1: VS Code Dev Containers Extension

1. **Install Prerequisites:**
   - [Docker](https://www.docker.com/get-started)
   - [VS Code](https://code.visualstudio.com/)
   - [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Open in Dev Container:**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd provoco-web
   
   # Open in VS Code
   code .
   ```

3. **Launch Dev Container:**
   - VS Code will detect the `.devcontainer` configuration
   - Click "Reopen in Container" when prompted
   - Or use Command Palette: `Dev Containers: Reopen in Container`

### Option 2: Manual Docker Setup

```bash
# Build the dev container
docker build -t prismscope-dev .devcontainer/

# Run the dev container
docker run -it --rm \
  -v $(pwd):/workspace \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 3000:3000 -p 8080:8080 -p 8081:8081 \
  --network host \
  prismscope-dev
```

## 🛠️ What's Included

### Development Tools
- **Node.js 20** - Latest LTS version
- **npm** - Package manager with global dev tools
- **Git** - Version control with helpful aliases
- **Zsh + Oh My Zsh** - Enhanced terminal experience
- **Vim/Nano** - Text editors for quick edits

### Build & Testing Tools
- **Vite** - Development server and build tool
- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **broken-link-checker** - Link validation tool
- **http-server** - Static file serving

### Container & Cloud Tools
- **Docker-in-Docker** - Build and run containers
- **kubectl** - Kubernetes command-line tool
- **Google Cloud CLI** - GCP integration
- **GitHub CLI** - GitHub automation

### VS Code Extensions
- **React Development** - React, JSX, and component tools
- **Tailwind CSS** - Utility-first CSS framework support
- **Git Integration** - GitLens, GitHub PR/Issues
- **Docker & Kubernetes** - Container development tools
- **Code Quality** - ESLint, Prettier, spell checker
- **Productivity** - TODO highlights, file icons, themes

## 📂 Directory Structure

```
/workspace/                 # Main project directory
├── .devcontainer/         # Dev container configuration
│   ├── devcontainer.json  # Container configuration
│   ├── Dockerfile         # Development environment image
│   └── README.md         # This file
├── .vscode/              # VS Code workspace settings
│   ├── settings.json     # Editor preferences
│   ├── tasks.json        # Build and development tasks
│   ├── launch.json       # Debug configurations
│   └── extensions.json   # Recommended extensions
├── src/                  # React application source
├── k8s/                  # Kubernetes manifests
├── scripts/              # Development and utility scripts
└── ...                   # Other project files
```

## 🎯 Development Workflow

### 1. Start Development Server
```bash
# Start Vite dev server (accessible at http://localhost:3000)
npm run dev

# Or start on all interfaces for container access
npm run dev:host
```

### 2. Build and Test
```bash
# Run complete test suite
npm run test:all

# Individual commands
npm run lint              # Check code quality
npm run build            # Build for production
npm run check-links      # Check for broken links
```

### 3. Docker Development
```bash
# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run

# Build and run in one command
npm run docker:dev
```

### 4. Kubernetes Development
```bash
# Deploy to GKE
npm run k8s:deploy

# Check deployment status
npm run k8s:status

# View application logs
npm run k8s:logs

# Create static IP
npm run gcp:static-ip
```

## 🔧 Available npm Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Vite development server |
| `dev:host` | Start dev server on all interfaces |
| `build` | Build for production |
| `preview` | Preview production build |
| `lint` | Run ESLint |
| `check-links` | Check for broken links |
| `check-links:local` | Check local build only |
| `check-links:live` | Check live website |
| `docker:build` | Build Docker image |
| `docker:run` | Run Docker container |
| `docker:dev` | Build and run Docker |
| `k8s:deploy` | Deploy to Kubernetes |
| `k8s:status` | Check Kubernetes status |
| `k8s:logs` | View Kubernetes logs |
| `test:all` | Run complete test suite |
| `clean` | Clean and reinstall dependencies |

## 🌐 Port Configuration

| Port | Service | Description |
|------|---------|-------------|
| 3000 | Vite Dev Server | Development server with HMR |
| 8080 | Production Preview | Built application preview |
| 8081 | Container Test | Alternative container port |
| 3001 | Backend API | Backend services (if needed) |

## ⚙️ VS Code Tasks

Access via Command Palette (`Ctrl+Shift+P`) → `Tasks: Run Task`:

- **Install Dependencies** - `npm install`
- **Start Development Server** - Launch dev server
- **Build for Production** - Create production build
- **Lint Code** - Run ESLint with problem matching
- **Check Links** - Validate links with reporting
- **Build Docker Image** - Create container image
- **Deploy to GKE** - Deploy to Kubernetes
- **Full Development Setup** - Complete environment setup
- **Full Build and Test** - Complete CI pipeline

## 🐛 Debugging

### Browser Debugging
1. Start dev server: `npm run dev`
2. Use VS Code debugger: `F5` → "Launch Chrome against localhost"
3. Set breakpoints in React components

### Node.js Debugging
1. Use "Debug Link Checker" configuration
2. Debug build process with "Debug Vite Build"
3. Set breakpoints in `scripts/check-links.js`

## 🔒 Security Features

- **Non-root user** - Runs as `node` user (UID 1000)
- **Sudo access** - Passwordless sudo for system tasks
- **Docker socket** - Secure Docker-in-Docker setup
- **Network isolation** - Controlled network access
- **Secret management** - No hardcoded credentials

## 🛠️ Customization

### Add New Extensions
Edit `.devcontainer/devcontainer.json`:
```json
"customizations": {
  "vscode": {
    "extensions": [
      "your.extension.id"
    ]
  }
}
```

### Modify Container
Edit `.devcontainer/Dockerfile` to add:
- New system packages
- Additional global npm packages
- Custom configurations
- Environment variables

### Update VS Code Settings
Edit `.vscode/settings.json` for:
- Editor preferences
- Extension configurations
- Workspace-specific settings

## 🚨 Troubleshooting

### Container Won't Start
```bash
# Check Docker is running
docker --version

# Rebuild container
docker system prune -f
code . # Reopen in container
```

### Port Conflicts
```bash
# Check port usage
netstat -tlnp | grep :3000

# Use alternative ports in devcontainer.json
"forwardPorts": [3001, 8082, 8083]
```

### Permission Issues
```bash
# Fix file permissions in container
sudo chown -R node:node /workspace
sudo chmod -R 755 /workspace
```

### Missing Tools
```bash
# Install additional tools
sudo apt-get update
sudo apt-get install <package-name>

# Install global npm packages
npm install -g <package-name>
```

## 📚 Additional Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Documentation](https://docs.docker.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Google Cloud Documentation](https://cloud.google.com/docs)

## 🤝 Contributing

1. Make changes in the dev container
2. Test locally with `npm run test:all`
3. Build Docker image: `npm run docker:build`
4. Run link checker: `npm run check-links`
5. Commit and push changes
6. CI/CD pipeline will handle deployment

---

## 🎉 You're Ready!

Your complete Prismscope development environment is ready. Start coding with:

```bash
npm run dev:host
```

Happy coding! 🚀