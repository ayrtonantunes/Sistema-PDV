const { Router } = require('express')
const rotas = Router()

const { cadastrarUsuario } = require('./controladores/usuario')
const {
  validarCorpo,
  verificarEmailInformado,
} = require('./intermediarios/usuario')

rotas.post('/usuario', validarCorpo, verificarEmailInformado, cadastrarUsuario)

module.exports = rotas
