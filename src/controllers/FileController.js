const aws = require('aws-sdk')
const crypto = require('crypto')

const Box = require('../models/Box')
const File = require('../models/File')

const config = require('../config')
const s3Config = require('../config/s3')

class FileController {
  store (req, res) {
    const s3ObjectKey = `${crypto.randomBytes(16).toString('hex')}_${req.file.originalname}`
    const s3Bucket = new aws.S3(s3Config)

    const params = {
      Bucket: config.s3.S3_BUCKET_NAME,
      Key: s3ObjectKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    }

    s3Bucket.upload(params, async (err, data) => {
      if (err) {
        res.status(500).json({ error: true, message: err })
      } else {
        const box = await Box.findById(req.params.id)
        const file = await File.create({
          title: req.file.originalname,
          etag: data.ETag,
          key: data.Key
        })

        box.files.push(file)
        await box.save()

        req.io.sockets.in(box._id).emit('file', file)

        res.json(file)
      }
    })
  }
}

module.exports = new FileController()
