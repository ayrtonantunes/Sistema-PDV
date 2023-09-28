const { Router } = require('express')
const rotas = Router()

const { 
  cadastrarUsuario, 
  loginUsuario,
  atualizarUsuario,
} = require('./controladores/usuario')

const {
  validarCorpo,
  verificarEmailInformado,
  verificarUsuarioLogado,
  validarCorpoLogin
} = require('./intermediarios/usuario')

rotas.post('/usuario', validarCorpo, verificarEmailInformado, cadastrarUsuario)
rotas.post('/login', validarCorpoLogin, loginUsuario)

rotas.use(verificarUsuarioLogado)

rotas.put('/usuario', validarCorpo, atualizarUsuario)

module.exports = rotas
