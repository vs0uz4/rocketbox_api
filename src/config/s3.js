const config = require('./index')

module.exports = {
  accessKeyId: config.s3.S3_ACCESS_KEY,
  secretAccessKey: config.s3.S3_SECRET_KEY,
  endpoint: config.s3.S3_ENDPOINT,
  region: config.s3.S3_REGION,
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
}
