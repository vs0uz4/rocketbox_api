/* eslint-disable no-process-env */
require('dotenv').config()

const environments = [
  'NODE_ENV',
  'URL',
  'PORT',
  'MONGODB_HOST',
  'MONGODB_USER',
  'MONGODB_PASSWORD',
  'MONGODB_DATABASE',
  'S3_ACCESS_KEY',
  'S3_SECRET_KEY',
  'S3_ENDPOINT',
  'S3_REGION',
  'S3_BUCKET_NAME',
  'S3_URL_FILE_LINK'
]

environments.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}\n${name} enviroment variable not defined`)
  }
})

let mongoosebURI = ''
const mongodbHost = process.env.MONGODB_HOST || 'localhost'
const mongodbUser = process.env.MONGODB_USER || 'omnistack'
const mongodbPassword = process.env.MONGODB_PASSWORD || 'omnistack'
const mongodbDatabase = process.env.MONGODB_DATABASE || 'omnistack'

if (process.env.NODE_ENV === 'production') {
  mongoosebURI = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true`
} else {
  mongoosebURI = `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true`
}

const config = {
  app: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: `${process.env.URL}` || 'http://localhost:3000'
  },
  mongodb: {
    URI: mongoosebURI,
    OPTIONS: {
      useNewUrlParser: true
    }
  },
  s3: {
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || 'BDIS44FB8UUXM40DFCKV',
    S3_SECRET_KEY: process.env.S3_SECRET_KEY || 'TA5pCZ8ZLPCRP0rtkIqommpHve_pakPZbdQqR6XM',
    S3_ENDPOINT: process.env.S3_ENDPOINT || 'http://127.0.0.1:9000',
    S3_REGION: process.env.S3_REGION || 'us-east-1',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'rocketbox',
    S3_URL_FILE_LINK: process.env.S3_URL_FILE_LINK || 'http://127.0.0.1:9000/rocketbox/'
  }
}

module.exports = config
