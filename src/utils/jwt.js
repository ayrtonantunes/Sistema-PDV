const jwt = require('jsonwebtoken')

function gerarToken(dados, tempo) {
  return jwt.sign(dados, process.env.SENHA_JWT, { expiresIn: tempo })
}

function verificarToken(token) {
  return jwt.verify(token, process.env.SENHA_JWT)
}

module.exports = {
  gerarToken,
  verificarToken,
}
