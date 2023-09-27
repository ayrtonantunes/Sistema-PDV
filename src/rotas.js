const { Router } = require('express')
const rotas = Router()

const { cadastrarUsuario, loginUsuario } = require('./controladores/usuario')
const {
  validarCorpo,
  verificarEmailInformado,
} = require('./intermediarios/usuario')

rotas.post('/usuario', validarCorpo, verificarEmailInformado, cadastrarUsuario)
rotas.post('/login', loginUsuario)

module.exports = rotas
