const conexaoBanco = require('../conexao')

const buscarEmailUsuario = (email) => {
  const dadosUsuario = conexaoBanco('usuarios').where({ email })
  return dadosUsuario
}

const adicionarUsuario = (usuario) => {
  const { nome, email, senhaCriptografada } = usuario
  const novoUsuario = conexaoBanco('usuarios')
  .insert({ nome, email, senha: senhaCriptografada })
  .returning('*')
  return novoUsuario
}

const buscarIdUsuario = (id) => {
  const idUsuario = conexaoBanco('usuarios').where({ id })
  return idUsuario
}

module.exports = {
  buscarEmailUsuario,
  adicionarUsuario,
  buscarIdUsuario,
}
