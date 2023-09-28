const { Router } = require('express')
const rotas = Router()

const {
  cadastrarUsuario,
  loginUsuario,
  atualizarUsuario,
} = require('./controladores/usuario')

const {
  validarCorpo,
  verificarEmail,
  verificarUsuarioLogado,
  validarCorpoLogin,
} = require('./intermediarios/usuario')

rotas.post('/usuario', validarCorpo, verificarEmail, cadastrarUsuario)
rotas.post('/login', validarCorpoLogin, loginUsuario)

rotas.use(verificarUsuarioLogado)

rotas.put('/usuario', validarCorpo, verificarEmail, atualizarUsuario)

module.exports = rotas
