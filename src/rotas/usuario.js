const { Router } = require('express')
const rota = Router()

const {
  cadastrarUsuario,
  loginUsuario,
  editarUsuario,
  detalharUsuario,
} = require('../controladores/usuario')
const validarToken = require('../intermediarios/token')
const validarCorpo = require('../intermediarios/validarCorpo')
const { esquemaUsuario, esquemaLogin } = require('../esquemas/usuario')

rota.post('/usuario', validarCorpo(esquemaUsuario), cadastrarUsuario)
rota.post('/login', validarCorpo(esquemaLogin), loginUsuario)

rota.use(validarToken)

rota.get('/usuario', detalharUsuario)
rota.put('/usuario', validarCorpo(esquemaUsuario), editarUsuario)

module.exports = rota
