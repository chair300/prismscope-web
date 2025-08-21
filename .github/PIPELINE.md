# 🚀 Prismscope CI/CD Pipeline

## Overview

This CI/CD pipeline automatically builds, tests, and deploys the Prismscope website with comprehensive broken link checking.

## Pipeline Triggers

### 1. **Push to Main/Master Branch**
- Full build, test, and deployment pipeline
- Broken link testing on built site
- Docker image build and push to GCR
- Automated deployment to GKE

### 2. **Pull Requests**
- Build and test only (no deployment)
- Broken link checking on PR changes
- Quick feedback for developers

### 3. **Scheduled Runs** 
- Daily at 6 AM UTC
- Comprehensive link checking on live website
- Automatic issue creation if broken links found

## Pipeline Jobs

### 1. 🔨 **Build & Test**
```yaml
- Install Node.js dependencies
- Run production build  
- Upload build artifacts
- Duration: ~2-3 minutes
```

### 2. 🔍 **Broken Link Checker**
```yaml
- Download build artifacts
- Start local HTTP server
- Run broken-link-checker tool
- Check local build for broken links
- Check live website (on main branch)
- Generate detailed reports
- Duration: ~3-5 minutes
```

### 3. 🐳 **Docker Build & Push** (main branch only)
```yaml
- Authenticate with Google Cloud
- Build Docker image with commit SHA tag
- Push to Google Container Registry
- Duration: ~5-8 minutes
```

### 4. 🚢 **Deploy to GKE** (main branch only)
```yaml
- Get GKE cluster credentials
- Deploy cert-manager ClusterIssuer
- Update Kubernetes manifests
- Deploy to external-web namespace
- Wait for rollout completion
- Verify deployment health
- Duration: ~3-5 minutes
```

### 5. 📊 **Notification & Reporting**
```yaml
- Generate deployment summary
- Create GitHub step summary
- Report pipeline status
- Duration: ~1 minute
```

### 6. ⏰ **Scheduled Link Check** (daily)
```yaml
- Comprehensive link checking
- External link validation
- Automatic issue creation for problems
- Detailed reporting and artifacts
- Duration: ~5-10 minutes
```

## Link Checker Features

### **What It Checks:**
- ✅ All internal links (`/about`, `/contact`, etc.)
- ✅ Image sources (`src` attributes)
- ✅ CSS imports and references
- ✅ JavaScript module imports
- ✅ Anchor links within pages
- ✅ Social media links (external)
- ✅ Font and asset references

### **What It Excludes:**
- ❌ JavaScript protocols (`javascript:`)
- ❌ Email links (`mailto:`)
- ❌ Phone links (`tel:`)
- ❌ Hash-only links (`#`)
- ❌ Data URIs (`data:`)

### **Failure Conditions:**
- **4xx/5xx HTTP responses**
- **DNS resolution failures**
- **Connection timeouts**
- **Malformed URLs**
- **Missing files/resources**

## Required Secrets

Set these in your GitHub repository secrets:

### `GCP_SA_KEY`
Google Cloud Service Account key with permissions:
```json
{
  "type": "service_account",
  "project_id": "ai-problem-statement",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "github-actions@ai-problem-statement.iam.gserviceaccount.com"
}
```

**Required IAM Roles:**
- `Container Registry Service Agent`
- `Kubernetes Engine Developer`
- `Compute Instance Admin (v1)`

## Configuration

### Update Pipeline Variables

Edit `.github/workflows/ci-cd.yml`:

```yaml
env:
  PROJECT_ID: ai-problem-statement
  GKE_CLUSTER: your-cluster-name    # ← Update this
  GKE_ZONE: us-central1-a           # ← Update this
  DEPLOYMENT_NAME: prismscope-website
  IMAGE: prismscope-website
  NAMESPACE: external-web
```

### Link Checker Configuration

Customize link checking in `.github/link-checker-config.json`:

```json
{
  "filterLevel": 2,           // 0=strict, 1=normal, 2=relaxed
  "excludeExternalLinks": true,
  "maxRetries": 2,
  "timeout": 30000,
  "excludedKeywords": [...]
}
```

## Pipeline Outputs

### **Successful Run:**
- ✅ Docker image: `gcr.io/ai-problem-statement/prismscope-website:latest`
- ✅ Kubernetes deployment updated
- ✅ Website live at: `https://prismscope.ai`
- ✅ No broken links found

### **Failed Run:**
- ❌ Build logs available in GitHub Actions
- ❌ Link checker report with broken URLs
- ❌ Deployment logs for troubleshooting
- ❌ Automatic issue creation (scheduled runs)

## Monitoring

### **GitHub Actions Dashboard:**
- View pipeline status and history
- Download link check reports
- Monitor deployment success rates

### **Kubernetes Monitoring:**
```bash
# Check deployment status
kubectl get all -n external-web

# View pod logs
kubectl logs -n external-web -l app=prismscope-website

# Check certificate status
kubectl get certificates -n external-web
```

### **Scheduled Link Checks:**
- Daily automated checks
- Issues created for broken links
- 30-day retention of detailed reports

## Troubleshooting

### **Build Failures:**
1. Check Node.js version compatibility
2. Review package.json dependencies
3. Verify build script configuration

### **Link Check Failures:**
1. Review link-check-report artifacts
2. Check for typos in URLs
3. Verify external service availability
4. Update excluded keywords if needed

### **Docker Build Failures:**
1. Check Dockerfile syntax
2. Verify base image availability  
3. Review build context size
4. Check GCR authentication

### **Deployment Failures:**
1. Verify GKE cluster access
2. Check Kubernetes manifest syntax
3. Review resource quotas
4. Verify image pull permissions

## Security

### **Image Scanning:**
- Docker images scanned for vulnerabilities
- Base images regularly updated
- Security patches applied automatically

### **Access Control:**
- Service account with minimal permissions
- Secrets managed through GitHub Secrets
- No hardcoded credentials in code

### **Network Security:**
- HTTPS-only deployment
- Security headers enforced
- Rate limiting enabled

## Performance

### **Pipeline Speed:**
- **Total time:** ~15-20 minutes (full deployment)
- **PR checks:** ~5-8 minutes (build + test only)
- **Scheduled checks:** ~5-10 minutes

### **Optimization:**
- Parallel job execution
- Docker layer caching
- Artifact reuse between jobs
- Concurrent link checking

---

## Quick Commands

```bash
# Manually trigger link check
gh workflow run ci-cd.yml

# View pipeline status  
gh run list --workflow=ci-cd.yml

# Download link check report
gh run download [RUN_ID] --name link-check-report

# Check live website manually
npx broken-link-checker https://prismscope.ai --verbose
```