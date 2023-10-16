const { Router } = require('express')
const rota = Router()

const { listarPedidos, cadastrarPedido } = require('../controladores/pedido')
const validarCorpo = require('../intermediarios/validarCorpo')
const esquemaPedido = require('../esquemas/pedido')

rota.get('/pedido', listarPedidos)
rota.post('/pedido', validarCorpo(esquemaPedido), cadastrarPedido)

module.exports = rota
