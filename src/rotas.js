const { Router } = require('express')
const rotas = Router()

const { cadastrarUsuario, loginUsuario } = require('./controladores/usuario')

const {
  validarCorpo,
  verificarUsuarioLogado,
  validarCorpoLogin,
} = require('./intermediarios/usuario')

rotas.post('/usuario', validarCorpo, cadastrarUsuario)
rotas.post('/login', validarCorpoLogin, loginUsuario)

rotas.use(verificarUsuarioLogado)

module.exports = rotas
