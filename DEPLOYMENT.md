# AWS Deployment Guide

This guide explains how to deploy the My TikTok application to AWS using Terraform and GitHub Actions.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **GitHub repository** with Actions enabled
3. **Terraform** installed locally (for manual deployment)
4. **AWS CLI** configured (for manual deployment)

## AWS Resources Created

The Terraform scripts will create the following AWS resources:

- **S3 Bucket for Media Storage**: Stores the actual media files (videos/images)
- **S3 Bucket for Website Hosting**: Hosts the static website files
- **CloudFront Distribution**: CDN for global content delivery
- **IAM Roles**: For deployment and Lambda execution (if enabled)
- **Lambda Function** (optional): For generating presigned URLs

## Configuration

### Required GitHub Secrets

Set up the following secrets in your GitHub repository (`Settings` > `Secrets and Variables` > `Actions`):

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_DEPLOYMENT_ROLE_ARN` | ARN of the IAM role for deployment | `arn:aws:iam::123456789012:role/my-deployment-role` |
| `MEDIA_BUCKET_NAME` | Globally unique S3 bucket name for media storage | `my-company-tiktok-media-prod-12345` |
| `AWS_REGION` | AWS region for deployment | `us-east-1` |
| `GITHUB_OIDC_PROVIDER_ARN` | ARN of GitHub OIDC provider | `arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com` |

### Optional GitHub Secrets

| Secret Name | Description | Default |
|-------------|-------------|---------|
| `CLOUDFRONT_PRICE_CLASS` | CloudFront price class | `PriceClass_100` |
| `API_ENDPOINT` | Backend API endpoint for media | `/api/random-media` |
| `CREATE_LAMBDA_BACKEND` | Whether to create Lambda backend | `false` |

## Setup Instructions

### 1. Set up AWS OIDC Provider (One-time setup)

Create an OIDC provider in AWS IAM for GitHub Actions:

```bash
aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com \
    --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### 2. Create Deployment Role

Create an IAM role that GitHub Actions can assume:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_USERNAME/my-tiktok:*"
        }
      }
    }
  ]
}
```

Attach these policies to the role:
- `PowerUserAccess` (or create a custom policy with specific permissions)

### 3. Configure GitHub Secrets

Add all required secrets to your GitHub repository as listed above.

### 4. Deploy

#### Automatic Deployment

Push to the `main` branch to trigger automatic deployment:

```bash
git push origin main
```

#### Manual Deployment

Use the workflow dispatch feature in GitHub Actions:

1. Go to `Actions` tab in your repository
2. Select "Deploy to AWS" workflow
3. Click "Run workflow"
4. Choose environment (development/staging/production)

### 5. Manual Terraform Deployment (Alternative)

If you prefer to deploy manually:

```bash
cd terraform

# Copy and customize the example variables file
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

# Initialize and apply
terraform init
terraform plan
terraform apply

# Upload website files
aws s3 sync ../ s3://YOUR_BUCKET_NAME-website/ \
  --exclude ".git/*" \
  --exclude "terraform/*" \
  --exclude ".github/*"
```

## Environment Configuration

The application supports multiple environments through configuration:

- **Development**: Uses sample data, allows localhost CORS
- **Staging**: Uses API endpoint, restricted CORS
- **Production**: Production settings, strict security

Configure environment-specific settings through GitHub secrets or Terraform variables.

## Accessing Your Application

After deployment, access your application at:
- **CloudFront URL**: `https://d1234567890abc.cloudfront.net`
- **S3 Website URL**: `http://your-bucket-website.s3-website-us-east-1.amazonaws.com`

The CloudFront URL is recommended for production use.

## Troubleshooting

### Common Issues

1. **Bucket name already exists**: Change `MEDIA_BUCKET_NAME` to a globally unique value
2. **Permission denied**: Ensure the deployment role has sufficient permissions
3. **OIDC provider not found**: Create the GitHub OIDC provider first
4. **CloudFront distribution failed**: Check AWS service limits

### Debugging

Check the GitHub Actions logs for detailed error messages. For Terraform issues, run locally with debug output:

```bash
TF_LOG=DEBUG terraform apply
```

## Security Best Practices

1. **Principle of Least Privilege**: Use minimal IAM permissions
2. **Secure Secrets**: Never commit secrets to version control
3. **S3 Bucket Policies**: Media bucket is private, website bucket allows public read
4. **HTTPS Only**: CloudFront redirects HTTP to HTTPS
5. **CORS Configuration**: Restricts origins based on environment

## Cost Optimization

- Use `PriceClass_100` for CloudFront in development
- Enable S3 lifecycle policies for old versions
- Monitor AWS costs and set up billing alerts

## Updating the Application

To update the application:

1. Make changes to your code
2. Commit and push to the appropriate branch
3. GitHub Actions will automatically deploy the changes
4. CloudFront cache will be invalidated automatically

## Destroying Resources

To destroy all AWS resources:

```bash
cd terraform
terraform destroy
```

**Warning**: This will permanently delete all resources and data!