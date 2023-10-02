const jwt = require('jsonwebtoken')

function gerarToken(dados, tempo) {
  const token = jwt.sign(dados, process.env.SENHA_JWT, { expiresIn: tempo })
  return token
}

function verificarToken(token) {
  try {
    return jwt.verify(token, process.env.SENHA_JWT)
  } catch (err) {
    return null
  }
}

module.exports = {
  gerarToken,
  verificarToken,
}
