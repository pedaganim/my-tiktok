variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (e.g., development, staging, production)"
  type        = string
  default     = "development"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be one of: development, staging, production."
  }
}

variable "media_bucket_name" {
  description = "Name of the S3 bucket for storing media files. Must be globally unique."
  type        = string

  validation {
    condition = can(regex("^[a-z0-9][a-z0-9-]*[a-z0-9]$", var.media_bucket_name)) && length(var.media_bucket_name) >= 3 && length(var.media_bucket_name) <= 63
    error_message = "S3 bucket name must be between 3 and 63 characters long, contain only lowercase letters, numbers, and hyphens, and must not start or end with a hyphen."
  }
}

variable "cloudfront_price_class" {
  description = "CloudFront distribution price class"
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_All", "PriceClass_200", "PriceClass_100"], var.cloudfront_price_class)
    error_message = "CloudFront price class must be one of: PriceClass_All, PriceClass_200, PriceClass_100."
  }
}

variable "deployment_role_arn" {
  description = "ARN of the IAM role that will be used for deployment. Leave empty to use the root account."
  type        = string
  default     = ""
}

variable "github_repository" {
  description = "GitHub repository in the format 'owner/repo' for OIDC integration"
  type        = string
  default     = "pedaganim/my-tiktok"
}

variable "github_oidc_provider_arn" {
  description = "ARN of the GitHub OIDC provider for authentication"
  type        = string
  default     = ""
}

variable "create_lambda_backend" {
  description = "Whether to create Lambda function for backend API to generate presigned URLs"
  type        = bool
  default     = false
}