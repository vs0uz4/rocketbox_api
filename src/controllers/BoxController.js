const Box = require('../models/Box')

class BoxController {
  async index (req, res) {
    const boxes = await Box.find()

    return res.json(boxes)
  }

  async store (req, res) {
    const title = req.body.title
    const box = await Box.create({ title })

    return res.json(box)
  }

  async show (req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    })

    return res.json(box)
  }
}

module.exports = new BoxController()
