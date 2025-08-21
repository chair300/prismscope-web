#!/bin/bash

# Script to create a static IP for the Prismscope website in GCP
# Make sure you're logged into the correct GCP project: ai-problem-statement

set -e

PROJECT_ID="ai-problem-statement"
STATIC_IP_NAME="prismscope-website-static-ip"
REGION="us-central1"  # Change to your preferred region

echo "Creating static IP for Prismscope website..."
echo "Project: $PROJECT_ID"
echo "Static IP Name: $STATIC_IP_NAME"
echo "Region: $REGION"

# Create the static IP
gcloud compute addresses create $STATIC_IP_NAME \
    --project=$PROJECT_ID \
    --region=$REGION

# Get the IP address
STATIC_IP=$(gcloud compute addresses describe $STATIC_IP_NAME \
    --project=$PROJECT_ID \
    --region=$REGION \
    --format="value(address)")

echo "Static IP created successfully!"
echo "IP Address: $STATIC_IP"
echo ""
echo "Next steps:"
echo "1. Update your DNS records to point prismscope.ai and www.prismscope.ai to $STATIC_IP"
echo "2. Uncomment and update the static IP annotation in k8s/service.yaml:"
echo "   cloud.google.com/reserved-ip-name: \"$STATIC_IP_NAME\""
echo "3. Deploy to Kubernetes"