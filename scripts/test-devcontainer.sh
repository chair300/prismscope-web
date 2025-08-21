#!/bin/bash

# Test script for dev container setup
# This script verifies that all tools and dependencies are working correctly

set -e

echo "🧪 Testing Prismscope Dev Container Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test function
test_command() {
    local cmd=$1
    local description=$2
    
    printf "Testing %-30s" "$description"
    
    if eval "$cmd" &>/dev/null; then
        echo -e "${GREEN}✓ PASS${NC}"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        return 1
    fi
}

# Test Node.js and npm
echo -e "\n${BLUE}📦 Node.js Environment${NC}"
test_command "node --version" "Node.js"
test_command "npm --version" "npm"
test_command "npx --version" "npx"

# Test global packages
echo -e "\n${BLUE}🌐 Global Packages${NC}"
test_command "http-server --version" "http-server"
test_command "broken-link-checker --version" "broken-link-checker"

# Test project dependencies
echo -e "\n${BLUE}📚 Project Dependencies${NC}"
if [ -f "package.json" ]; then
    test_command "npm list --depth=0" "npm dependencies"
else
    echo -e "${YELLOW}⚠ package.json not found - run npm install${NC}"
fi

# Test build tools
echo -e "\n${BLUE}🔨 Build Tools${NC}"
test_command "which vite || npx vite --version" "Vite"
test_command "which eslint || npx eslint --version" "ESLint"
test_command "which prettier || npx prettier --version" "Prettier"

# Test container tools
echo -e "\n${BLUE}🐳 Container Tools${NC}"
test_command "docker --version" "Docker"
test_command "kubectl version --client" "kubectl"
test_command "gcloud --version" "Google Cloud CLI"
test_command "gh --version" "GitHub CLI"

# Test development commands
echo -e "\n${BLUE}⚙️ Development Scripts${NC}"
test_command "npm run build" "npm run build"
test_command "[ -d 'dist' ]" "Build output exists"

# Test Git configuration
echo -e "\n${BLUE}📝 Git Configuration${NC}"
test_command "git --version" "Git"
test_command "git config --get user.name || echo 'Not configured'" "Git user name"
test_command "git config --get user.email || echo 'Not configured'" "Git user email"

# Test permissions
echo -e "\n${BLUE}🔐 Permissions${NC}"
test_command "[ -w /workspace ]" "Workspace writable"
test_command "[ -w /tmp ]" "Temp directory writable"
test_command "sudo echo 'sudo access'" "Sudo access"

# Test network connectivity
echo -e "\n${BLUE}🌐 Network Connectivity${NC}"
test_command "ping -c 1 google.com" "Internet connectivity"
test_command "curl -s https://registry.npmjs.org/ | head -1" "npm registry"

# Test project structure
echo -e "\n${BLUE}📁 Project Structure${NC}"
test_command "[ -f 'package.json' ]" "package.json exists"
test_command "[ -f 'vite.config.js' ]" "vite.config.js exists"
test_command "[ -d 'src' ]" "src directory exists"
test_command "[ -d 'k8s' ]" "k8s directory exists"
test_command "[ -d '.devcontainer' ]" ".devcontainer exists"

# Summary
echo -e "\n${BLUE}📊 Test Summary${NC}"
echo "=============================="

if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Dev container is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Start development server: npm run dev:host"
    echo "2. Open browser: http://localhost:3000"
    echo "3. Start coding! 🚀"
else
    echo -e "${RED}❌ Some tests failed. Check the output above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "1. Run: npm install"
    echo "2. Check Docker is running"
    echo "3. Verify internet connectivity"
    exit 1
fi

# Optional: Show useful information
echo -e "\n${BLUE}ℹ️  Useful Commands${NC}"
echo "==================="
echo "npm run dev:host     - Start development server"
echo "npm run build        - Build for production"
echo "npm run check-links  - Check for broken links"
echo "npm run docker:dev   - Build and run Docker container"
echo "npm run k8s:deploy   - Deploy to Kubernetes"
echo ""
echo "VS Code Tasks: Ctrl+Shift+P → 'Tasks: Run Task'"
echo "VS Code Debug: F5 → 'Launch Chrome against localhost'"