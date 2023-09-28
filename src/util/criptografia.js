const bcrypt = require('bcrypt')

const criptografarSenha = (senha) => {
  const senhaCriptografada = bcrypt.hash(senha, 10)
  return senhaCriptografada
}

module.exports = { criptografarSenha }
