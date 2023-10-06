const { Router } = require('express')
const rota = Router()

const { listar } = require('../controladores/categoria')

rota.get('/categoria', listar)

module.exports = rota
