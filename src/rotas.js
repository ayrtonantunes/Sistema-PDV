const { Router } = require('express')
const helloWord = require('./controladores/helloword')
const rotas = Router()

rotas.get('/', helloWord)

module.exports = rotas
