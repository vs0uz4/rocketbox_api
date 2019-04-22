/* eslint-disable no-process-env */
require('dotenv').config()

const environments = [
  'NODE_ENV',
  'URL',
  'PORT',
  'MONGODB_HOST',
  'MONGODB_USER',
  'MONGODB_PASSWORD',
  'MONGODB_DATABASE'
]

environments.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}\n${name} enviroment variable not defined`)
  }
})

const nodeEnvironment = process.env.NODE_ENV || 'development'
const appPort = process.env.PORT || 3000
const appUrl = `${process.env.URL}:${appPort}` || `http://localhost:${appPort}`

const mongodbHost = process.env.MONGODB_HOST || 'localhost'
const mongodbUser = process.env.MONGODB_USER || 'omnistack'
const mongodbPassword = process.env.MONGODB_PASSWORD || 'omnistack'
const mongodbDatabase = process.env.MONGODB_DATABASE || 'omnistack'

let mongoosebURI = ''
if (process.env.NODE_ENV === 'production') {
  mongoosebURI = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true`
} else {
  mongoosebURI = `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true`
}

const mongooseOptions = {
  useNewUrlParser: true
}

const config = {
  app: {
    NODE_ENV: nodeEnvironment,
    PORT: appPort,
    URL: appUrl
  },
  mongodb: {
    URI: mongoosebURI,
    OPTIONS: mongooseOptions
  }
}

module.exports = config
