const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const socket = require('socket.io')
const cors = require('cors')

const routes = require('./routes')
const config = require('./config')

const app = express()
const server = http.Server(app)
const io = socket(server)

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

mongoose.connect(config.mongodb.URI, config.mongodb.OPTIONS, (err, db) => {
  if (err) {
    console.log('Não foi Possível Conectar ao Servidor MongoDB.\nPor Favor Inicie o Servidor.\nError:', err)
  } else {
    console.log('Conexão com o MongoDB Realizada com Sucesso!')
  }
})

app.use(cors())
app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
app.use(routes)

server.listen(config.app.PORT)
