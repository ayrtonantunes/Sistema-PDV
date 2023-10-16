const { Router } = require('express')
const rota = Router()

const {
  listarCliente,
  cadastrarCliente,
  editarCliente,
  detalharCliente,
} = require('../controladores/cliente')
const validarCorpo = require('../intermediarios/validarCorpo')
const esquemaCliente = require('../esquemas/cliente')
const validarCPF = require('../intermediarios/validarCPF')

rota.get('/cliente', listarCliente)
rota.post(
  '/cliente',
  validarCorpo(esquemaCliente),
  validarCPF,
  cadastrarCliente
)
rota.put(
  '/cliente/:id',
  validarCorpo(esquemaCliente),
  validarCPF,
  editarCliente
)
rota.get('/cliente/:id', detalharCliente)

module.exports = rota
