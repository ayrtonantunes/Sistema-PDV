const { Router } = require('express')
const rotas = Router()

const {
  cadastrarUsuario,
  loginUsuario,
  atualizarUsuario,
  detalharUsuario,
} = require('./controladores/usuario')

const {
  validarCorpo,
  verificarEmail,
  validarToken,
  validarCorpoLogin,
} = require('./intermediarios/usuario')

const { listar } = require('./controladores/categoria')

rotas.get('/categoria', listar)

rotas.post('/usuario', validarCorpo, verificarEmail, cadastrarUsuario)
rotas.post('/login', validarCorpoLogin, loginUsuario)

rotas.use(validarToken)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validarCorpo, verificarEmail, atualizarUsuario)


module.exports = rotas
