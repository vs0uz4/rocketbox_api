const mongodbHost = process.env.MONGODB_HOST || 'localhost'
const mongodbUser = process.env.MONGODB_USER || 'root'
const mongodbPassword = process.env.MONGODB_PASSWORD || 'rocketbox'
const mongodbDatabase = process.env.MONGODB_DATABASE || 'rocketbox'

let mongodbURI = ''
if (process.env.NODE_ENV === 'production') {
  mongodbURI = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true`
} else {
  mongodbURI = `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true`
}

const connectionOptions = {
  useNewUrlParser: true
}

module.exports = {
  mongodbURI,
  connectionOptions
}
