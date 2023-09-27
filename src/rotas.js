const { Router } = require('express')
const rotas = Router()

const { 
  cadastrarUsuario, 
  loginUsuario 
} = require('./controladores/usuario')

const {
  validarCorpo,
  verificarEmailInformado,
  verificarUsuarioLogado
} = require('./intermediarios/usuario')

rotas.post('/usuario', validarCorpo, verificarEmailInformado, cadastrarUsuario)
rotas.post('/login', loginUsuario)

rotas.use(verificarUsuarioLogado)

rotas.get('/teste', (req, res) => {
  return res.status(200).json('tudo certo')
})

module.exports = rotas
