const { Router } = require('express')
const rota = Router()

const {
  listarCliente,
  cadastrarCliente,
  editarCliente,
  detalharCliente,
} = require('../controladores/cliente')
const validarCorpo = require('../intermediarios/validarCorpo')
const esquemaCliente = require('../esquema/cliente')

rota.get('/cliente', listarCliente)
rota.post('/cliente', validarCorpo(esquemaCliente), cadastrarCliente)
rota.put('/cliente/:id', validarCorpo(esquemaCliente), editarCliente)
rota.get('/cliente/:id', detalharCliente)

module.exports = rota
