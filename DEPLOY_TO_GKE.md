# 🚀 Prismscope Website - GKE Deployment Guide

## Prerequisites
- ✅ Docker image built: `gcr.io/ai-problem-statement/prismscope-website:latest`
- ✅ Kubernetes manifests ready in `k8s/` directory
- ✅ Google Cloud SDK (`gcloud`) installed

## Step 1: Authenticate with Google Cloud

```bash
# Re-authenticate if needed
gcloud auth login

# Set the project
gcloud config set project ai-problem-statement

# Configure Docker for GCR
gcloud auth configure-docker
```

## Step 2: Get Your GKE Cluster Information

```bash
# List your clusters
gcloud container clusters list

# Get credentials for your cluster (replace with your cluster name and zone)
gcloud container clusters get-credentials YOUR_CLUSTER_NAME \
    --zone YOUR_CLUSTER_ZONE \
    --project ai-problem-statement
```

## Step 3: Push Docker Image to Google Container Registry

```bash
# Push the image (already built locally)
docker push gcr.io/ai-problem-statement/prismscope-website:latest
```

## Step 4: Create Static IP Address

```bash
cd k8s
./create-static-ip.sh
```

This will create a static IP named `prismscope-website-static-ip` and display the IP address.

## Step 5: Deploy to Kubernetes

### Option A: One-Click Deployment
```bash
cd k8s
# Update deploy.sh with your cluster info first
./deploy.sh
```

### Option B: Manual Step-by-Step Deployment

```bash
cd k8s

# 1. Create cert-manager ClusterIssuer
kubectl apply -f cluster-issuer.yaml

# 2. Deploy the application
kubectl apply -k .

# 3. Wait for deployment
kubectl wait --for=condition=available --timeout=300s \
    deployment/prismscope-website -n external-web

# 4. Get the external IP
kubectl get services -n external-web
```

## Step 6: Enable Static IP (Optional but Recommended)

1. Once you have the external IP, edit `k8s/service.yaml`
2. Uncomment this line:
   ```yaml
   cloud.google.com/reserved-ip-name: "prismscope-website-static-ip"
   ```
3. Redeploy:
   ```bash
   kubectl apply -k k8s/
   ```

## Step 7: Update DNS Records

Point your domain DNS records to the external IP:
```
A    prismscope.ai         -> YOUR_EXTERNAL_IP
A    www.prismscope.ai     -> YOUR_EXTERNAL_IP
```

## Step 8: Verify SSL Certificate

```bash
# Check certificate status
kubectl get certificates -n external-web

# Describe certificate for details
kubectl describe certificate prismscope-tls-secret -n external-web
```

## Monitoring Commands

```bash
# Check all resources in the namespace
kubectl get all -n external-web

# Check pod logs
kubectl logs -n external-web -l app=prismscope-website

# Check ingress status
kubectl get ingress -n external-web

# Check certificate renewal
kubectl get certificaterequests -n external-web
```

## Troubleshooting

### If pods are not starting:
```bash
kubectl describe pods -n external-web
kubectl logs -n external-web -l app=prismscope-website --previous
```

### If certificate is not issued:
```bash
kubectl describe certificate prismscope-tls-secret -n external-web
kubectl get certificaterequests -n external-web
kubectl describe certificaterequests -n external-web
```

### If external IP is not assigned:
```bash
kubectl describe service prismscope-website-service -n external-web
```

## Expected Result

- ✅ Website accessible at: `https://prismscope.ai`
- ✅ SSL certificate from Let's Encrypt
- ✅ Static IP address assigned
- ✅ Google Analytics integrated
- ✅ Health check available at: `/health`

---

## Current Status

🏗️ **Ready to Deploy!**

The Docker image is built and tagged: `gcr.io/ai-problem-statement/prismscope-website:latest`

**Next Steps:**
1. Run `gcloud auth login` to authenticate
2. Follow the steps above to deploy
3. Update your DNS to point to the assigned external IP