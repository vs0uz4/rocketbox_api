const mongoose = require('mongoose')
const config = require('../config')

const File = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

File.virtual('url').get(function () {
  const url = config.app.URL
  return `${url}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File)
