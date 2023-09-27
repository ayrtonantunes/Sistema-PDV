const bcrypt = require('bcrypt')

const criptografarSenha = (senha) => {
  return bcrypt.hash(senha, 10)
}

module.exports = { criptografarSenha }
