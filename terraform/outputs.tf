output "media_bucket_name" {
  description = "Name of the S3 bucket for media storage"
  value       = aws_s3_bucket.media_bucket.bucket
}

output "media_bucket_arn" {
  description = "ARN of the S3 bucket for media storage"
  value       = aws_s3_bucket.media_bucket.arn
}

output "website_bucket_name" {
  description = "Name of the S3 bucket for website hosting"
  value       = aws_s3_bucket.website_bucket.bucket
}

output "website_bucket_arn" {
  description = "ARN of the S3 bucket for website hosting"
  value       = aws_s3_bucket.website_bucket.arn
}

output "website_bucket_website_endpoint" {
  description = "Website endpoint of the S3 bucket"
  value       = aws_s3_bucket_website_configuration.website_bucket_website.website_endpoint
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website_distribution.id
}

output "cloudfront_distribution_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website_distribution.domain_name
}

output "cloudfront_distribution_hosted_zone_id" {
  description = "Hosted zone ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website_distribution.hosted_zone_id
}

output "website_url" {
  description = "URL of the deployed website"
  value       = "https://${aws_cloudfront_distribution.website_distribution.domain_name}"
}

output "deployment_role_arn" {
  description = "ARN of the IAM role for deployment"
  value       = aws_iam_role.deployment_role.arn
}

output "lambda_role_arn" {
  description = "ARN of the IAM role for Lambda function (if created)"
  value       = var.create_lambda_backend ? aws_iam_role.lambda_role[0].arn : null
}