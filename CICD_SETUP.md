# 🚀 CI/CD Pipeline Setup Guide

## Overview

Complete CI/CD pipeline with broken link testing for the Prismscope website.

## ✅ What's Included

- **🔨 Automated Build & Test** - Builds and validates the website
- **🔍 Broken Link Detection** - Tests for broken internal/external links  
- **🐳 Docker Build & Push** - Builds and pushes images to Google Container Registry
- **🚢 Kubernetes Deployment** - Automated deployment to GKE
- **📊 Reporting & Notifications** - Detailed reports and GitHub issue creation
- **⏰ Scheduled Monitoring** - Daily link checks with automatic alerting

## 📋 Setup Requirements

### 1. Google Cloud Setup

Create a service account for GitHub Actions:

```bash
# Create service account
gcloud iam service-accounts create github-actions \
    --description="Service account for GitHub Actions CI/CD" \
    --display-name="GitHub Actions"

# Grant necessary permissions
gcloud projects add-iam-policy-binding ai-problem-statement \
    --member="serviceAccount:github-actions@ai-problem-statement.iam.gserviceaccount.com" \
    --role="roles/container.developer"

gcloud projects add-iam-policy-binding ai-problem-statement \
    --member="serviceAccount:github-actions@ai-problem-statement.iam.gserviceaccount.com" \
    --role="roles/container.clusterAdmin"

gcloud projects add-iam-policy-binding ai-problem-statement \
    --member="serviceAccount:github-actions@ai-problem-statement.iam.gserviceaccount.com" \
    --role="roles/compute.instanceAdmin"

# Create and download key
gcloud iam service-accounts keys create github-actions-key.json \
    --iam-account=github-actions@ai-problem-statement.iam.gserviceaccount.com
```

### 2. GitHub Secrets Configuration

Add these secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

| Secret Name | Value | Description |
|------------|-------|-------------|
| `GCP_SA_KEY` | Contents of `github-actions-key.json` | Service account key for GCP authentication |

### 3. Update Pipeline Configuration

Edit `.github/workflows/ci-cd.yml` and update these values:

```yaml
env:
  PROJECT_ID: ai-problem-statement
  GKE_CLUSTER: your-actual-cluster-name  # ← CHANGE THIS
  GKE_ZONE: us-central1-a               # ← CHANGE THIS  
  DEPLOYMENT_NAME: prismscope-website
  IMAGE: prismscope-website
  NAMESPACE: external-web
```

## 🎯 Pipeline Triggers

### Automatic Triggers
- **Push to `main`/`master`** → Full build, test, and deployment
- **Pull Requests** → Build and test only (no deployment)
- **Daily at 6 AM UTC** → Link check monitoring with issue creation

### Manual Triggers
```bash
# Trigger pipeline manually
gh workflow run ci-cd.yml

# Trigger with specific inputs
gh workflow run ci-cd.yml --ref main
```

## 🔍 Link Checking Features

### What Gets Checked
- ✅ All internal links (`/about`, `/pricing`, etc.)
- ✅ Image sources and asset references
- ✅ CSS and JavaScript imports
- ✅ External links (social media, documentation)
- ✅ Anchor links within pages

### Local Testing
```bash
# Check links in local build
npm run check-links:local

# Check links on live website  
npm run check-links:live

# Verbose output with details
npm run check-links:verbose

# Check both local and live
npm run check-links
```

## 📊 Pipeline Outputs

### Successful Deployment
```
✅ Build & Test: Passed
✅ Link Check: No broken links found  
✅ Docker Build: Image pushed to GCR
✅ Deployment: Live at https://prismscope.ai
```

### Failed Pipeline
```
❌ Build failed - Check build logs
❌ Broken links detected - Review link-check-report
❌ Deployment failed - Check Kubernetes logs
```

## 📈 Monitoring & Reporting

### GitHub Actions Dashboard
- View pipeline history and success rates
- Download link check reports
- Monitor deployment performance

### Automated Issue Creation
When scheduled link checks detect problems:
- 🚨 GitHub issue automatically created
- 📋 Detailed broken link report attached
- 🏷️ Tagged with `bug`, `automated`, `broken-links`

### Manual Monitoring Commands
```bash
# Check pipeline status
gh run list --workflow=ci-cd.yml

# View specific run details  
gh run view [RUN_ID]

# Download artifacts
gh run download [RUN_ID] --name link-check-report

# Check Kubernetes deployment
kubectl get all -n external-web
kubectl logs -n external-web -l app=prismscope-website
```

## 🛠️ Troubleshooting

### Common Issues

**❌ GCP Authentication Failed**
- Verify `GCP_SA_KEY` secret is correctly set
- Check service account has required permissions
- Ensure project ID matches in pipeline config

**❌ Link Check Failures**  
- Review `link-check-report` artifact for details
- Check if external services are temporarily down
- Update excluded URLs in `.github/link-checker-config.json`

**❌ Kubernetes Deployment Failed**
- Verify cluster name and zone in pipeline config
- Check if namespace `external-web` exists
- Review Kubernetes resource quotas

**❌ Docker Build Failed**
- Check Dockerfile syntax
- Verify base image availability
- Review build context size limitations

### Debug Commands

```bash
# Test link checker locally
npx broken-link-checker http://localhost:8080 --verbose

# Test Docker build locally
docker build -t test-image .

# Check Kubernetes deployment
kubectl describe deployment prismscope-website -n external-web

# View detailed pod logs
kubectl logs -n external-web -l app=prismscope-website --previous
```

## 🎯 Next Steps

1. **Set up the service account and secrets** (steps 1-2 above)
2. **Update pipeline configuration** with your cluster details
3. **Push changes to trigger the first pipeline run**
4. **Monitor the pipeline execution** in GitHub Actions
5. **Verify deployment** at https://prismscope.ai

## 📚 Additional Resources

- **Pipeline Documentation**: `.github/PIPELINE.md`
- **Link Checker Config**: `.github/link-checker-config.json`
- **Manual Link Checker**: `scripts/check-links.js`
- **Kubernetes Manifests**: `k8s/` directory

---

## 🚀 Quick Start

```bash
# 1. Configure secrets in GitHub
# 2. Update cluster details in .github/workflows/ci-cd.yml
# 3. Push to main branch
git add .
git commit -m "Add CI/CD pipeline with broken link testing"
git push origin main

# 4. Monitor in GitHub Actions
# 5. Check deployment at https://prismscope.ai
```

Your website now has enterprise-grade CI/CD with comprehensive link monitoring! 🎉