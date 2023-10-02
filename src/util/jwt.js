const jwt = require('jsonwebtoken')

function gerarToken(data, tempo = '3d') {
  const token = jwt.sign(data, process.env.SENHA_JWT, { expiresIn: tempo })
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
