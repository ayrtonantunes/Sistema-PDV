const { Router } = require('express')
const rota = Router()

const esquemaProduto = require('../esquema/produto')
const {
  listarProdutos,
  cadastrarProduto,
  excluirProduto,
  editarProduto,
  detalharProduto,
} = require('../controladores/produto')
const validarCorpo = require('../intermediarios/validarCorpo')

rota.get('/produto', listarProdutos)
rota.post('/produto', validarCorpo(esquemaProduto), cadastrarProduto)
rota.put('/produto/:id', validarCorpo(esquemaProduto), editarProduto)
rota.get('/produto/:id', detalharProduto)
rota.delete('/produto/:id', excluirProduto)

module.exports = rota
