const mongoose = require('mongoose')
const config = require('../config')

const File = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  etag: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

File.virtual('url').get(function () {
  const url = config.s3.S3_URL_FILE_LINK
  return `${url}/${encodeURIComponent(this.key)}`
})

module.exports = mongoose.model('File', File)
