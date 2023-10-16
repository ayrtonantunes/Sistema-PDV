const { Router } = require('express')
const rota = Router()

const esquemaProduto = require('../esquemas/produto')
const {
  listarProdutos,
  cadastrarProduto,
  excluirProduto,
  editarProduto,
  detalharProduto,
} = require('../controladores/produto')
const validarCorpo = require('../intermediarios/validarCorpo')
const multer = require('../config/multer')

rota.get('/produto', listarProdutos)
rota.post(
  '/produto',
  multer.single('produto_imagem'),
  validarCorpo(esquemaProduto),
  cadastrarProduto
)
rota.put(
  '/produto/:id',
  multer.single('produto_imagem'),
  validarCorpo(esquemaProduto),
  editarProduto
)
rota.get('/produto/:id', detalharProduto)
rota.delete('/produto/:id', multer.single('produto_imagem'), excluirProduto)

module.exports = rota
