#!/bin/bash

# Prismscope Website Deployment Script for GKE
# This script deploys the Prismscope website to Google Kubernetes Engine

set -e

# Configuration
PROJECT_ID="ai-problem-statement"
CLUSTER_NAME="your-gke-cluster-name"  # Replace with your GKE cluster name
CLUSTER_ZONE="us-central1-a"          # Replace with your cluster zone
IMAGE_NAME="prismscope-website"
STATIC_IP_NAME="prismscope-website-static-ip"

echo "🚀 Starting Prismscope Website deployment to GKE..."
echo "Project: $PROJECT_ID"
echo "Cluster: $CLUSTER_NAME"
echo "Zone: $CLUSTER_ZONE"

# Step 1: Authenticate and configure kubectl
echo "📋 Step 1: Configuring kubectl..."
gcloud auth configure-docker --quiet
gcloud container clusters get-credentials $CLUSTER_NAME \
    --zone $CLUSTER_ZONE \
    --project $PROJECT_ID

# Step 2: Build and push Docker image
echo "🔨 Step 2: Building and pushing Docker image..."
cd ..
docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:latest .
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:latest

# Step 3: Create static IP if it doesn't exist
echo "🌐 Step 3: Checking/Creating static IP..."
cd k8s
if ! gcloud compute addresses describe $STATIC_IP_NAME --region=us-central1 --project=$PROJECT_ID &>/dev/null; then
    echo "Creating static IP..."
    ./create-static-ip.sh
else
    echo "Static IP already exists"
    STATIC_IP=$(gcloud compute addresses describe $STATIC_IP_NAME \
        --project=$PROJECT_ID \
        --region=us-central1 \
        --format="value(address)")
    echo "Static IP: $STATIC_IP"
fi

# Step 4: Deploy cert-manager ClusterIssuer (if not exists)
echo "🔐 Step 4: Deploying cert-manager ClusterIssuer..."
kubectl apply -f cluster-issuer.yaml

# Step 5: Deploy application using Kustomize
echo "🚢 Step 5: Deploying application to Kubernetes..."
kubectl apply -k .

# Step 6: Wait for deployment to be ready
echo "⏳ Step 6: Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s \
    deployment/prismscope-website -n external-web

# Step 7: Get service status and external IP
echo "📊 Step 7: Checking service status..."
kubectl get services -n external-web
echo ""
echo "Getting external IP (this may take a few minutes)..."
kubectl get service prismscope-website-service -n external-web \
    --output jsonpath='{.status.loadBalancer.ingress[0].ip}'

# Step 8: Enable static IP reservation
echo ""
echo "🔧 Step 8: To enable static IP reservation, uncomment the annotation in service.yaml:"
echo "   cloud.google.com/reserved-ip-name: \"$STATIC_IP_NAME\""
echo "Then run: kubectl apply -k ."

# Step 9: Check certificate status
echo ""
echo "📜 Step 9: Checking certificate status..."
echo "To check Let's Encrypt certificate status:"
echo "kubectl get certificates -n external-web"
echo "kubectl describe certificate prismscope-tls-secret -n external-web"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌍 Your website should be accessible at:"
echo "   https://prismscope.ai"
echo "   https://www.prismscope.ai"
echo ""
echo "📝 Don't forget to:"
echo "   1. Point your DNS to the external IP address shown above"
echo "   2. Uncomment the static IP annotation in service.yaml for permanent IP"
echo "   3. Monitor certificate issuance with: kubectl get certificates -n external-web"