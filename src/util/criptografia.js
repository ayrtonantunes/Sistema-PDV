const bcrypt = require('bcrypt')

const criptografarSenha = (senha) => {
  return bcrypt.hash(senha, 10)
}

const compararSenha = (senha, hash) => {
  return bcrypt.compare(senha, hash)
}

module.exports = { criptografarSenha, compararSenha }
