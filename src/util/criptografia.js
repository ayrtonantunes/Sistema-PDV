const bcrypt = require('bcrypt')

const criptografarSenha = (senha) => {
  const senhaCriptografada = bcrypt.hash(senha, 10)
  return senhaCriptografada
}

const compararSenha = (senha, hash) => {
  const senhaComparada = bcrypt.compare(senha, hash)
  return senhaComparada
}

module.exports = { criptografarSenha, compararSenha }
