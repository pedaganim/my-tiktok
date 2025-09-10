# Terraform Infrastructure

This directory contains Terraform configuration files for deploying the My TikTok application to AWS.

## Files

- `main.tf` - Main infrastructure configuration
- `variables.tf` - Input variables and their descriptions
- `outputs.tf` - Output values from the deployment
- `terraform.tfvars.example` - Example configuration file

## Quick Start

1. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Edit `terraform.tfvars` with your specific values:
   - Set a globally unique S3 bucket name
   - Configure your AWS region
   - Set your environment name

3. Deploy:
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

## Configuration

See the main [Deployment Guide](../DEPLOYMENT.md) for detailed configuration instructions.

## Resources Created

- S3 bucket for media storage (private)
- S3 bucket for website hosting (public read)
- CloudFront distribution for global CDN
- IAM roles for deployment and Lambda execution
- Optional Lambda function for presigned URL generation

## Important Notes

- The media bucket name must be globally unique across all AWS accounts
- Ensure you have sufficient AWS permissions before running
- Review the planned changes with `terraform plan` before applying
- Use `terraform destroy` to clean up all resources when done