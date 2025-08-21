# Prismscope Development Container
FROM node:20-bullseye

# Set working directory
WORKDIR /workspace

# Install system dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    # Development tools
    git \
    curl \
    wget \
    vim \
    nano \
    zsh \
    fish \
    htop \
    tree \
    jq \
    unzip \
    zip \
    # Build tools
    build-essential \
    python3 \
    python3-pip \
    # Network tools
    iputils-ping \
    telnet \
    netcat \
    # Additional tools for link checking and testing
    ca-certificates \
    gnupg \
    lsb-release \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages for development
RUN npm install -g \
    # Development servers and tools
    http-server \
    live-server \
    # Testing and link checking
    broken-link-checker \
    # Build and deployment tools
    @vite/cli \
    create-vite \
    # Linting and formatting
    eslint \
    prettier \
    # Container and cloud tools will be installed via features

# Create non-root user with sudo access
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Configure the user
RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME

# Add user to sudo group and configure passwordless sudo
RUN apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Set up development environment
USER $USERNAME

# Install Oh My Zsh for better terminal experience
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || true

# Configure git (will be overridden by user's actual git config)
RUN git config --global init.defaultBranch main \
    && git config --global core.editor "code --wait" \
    && git config --global pull.rebase false

# Create development directories
RUN mkdir -p /home/$USERNAME/.local/bin \
    && mkdir -p /home/$USERNAME/.config

# Add useful aliases and functions to .bashrc
RUN echo 'export PATH="$HOME/.local/bin:$PATH"' >> /home/$USERNAME/.bashrc \
    && echo 'alias ll="ls -alF"' >> /home/$USERNAME/.bashrc \
    && echo 'alias la="ls -A"' >> /home/$USERNAME/.bashrc \
    && echo 'alias l="ls -CF"' >> /home/$USERNAME/.bashrc \
    && echo 'alias npm-check="npm run check-links"' >> /home/$USERNAME/.bashrc \
    && echo 'alias docker-build="docker build -t prismscope-website:dev ."' >> /home/$USERNAME/.bashrc \
    && echo 'alias k="kubectl"' >> /home/$USERNAME/.bashrc \
    && echo 'alias kns="kubectl config set-context --current --namespace"' >> /home/$USERNAME/.bashrc

# Add helpful development functions
RUN echo '# Development helper functions' >> /home/$USERNAME/.bashrc \
    && echo 'prism-dev() { npm run dev & npm run check-links:local; }' >> /home/$USERNAME/.bashrc \
    && echo 'prism-build() { npm run build && npm run preview; }' >> /home/$USERNAME/.bashrc \
    && echo 'prism-docker() { docker build -t prismscope-website:dev . && docker run -p 8080:8080 prismscope-website:dev; }' >> /home/$USERNAME/.bashrc \
    && echo 'prism-links() { echo "🔍 Checking links..." && npm run check-links; }' >> /home/$USERNAME/.bashrc

# Set up workspace directory permissions
RUN sudo chown -R $USERNAME:$USERNAME /workspace

# Set working directory for development
WORKDIR /workspace

# Expose development ports
EXPOSE 3000 8080 8081 3001

# Set default command
CMD ["bash"]