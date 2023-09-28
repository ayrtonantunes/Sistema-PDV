const conexaoBanco = require('../conexao')

const buscarEmailUsuario = (email) => {
  return conexaoBanco('usuarios').where({ email })
}

const adicionarUsuario = (usuario) => {
  const { nome, email, senhaCriptografada } = usuario
  return conexaoBanco('usuarios')
    .insert({ nome, email, senha: senhaCriptografada })
    .returning('*')
}

const buscarIdUsuario = (id) => {
  return conexaoBanco('usuarios').where({ id })
}

const usuarioAtualizado = (nome, email, senha, id) => {
  const usuario = conexaoBanco('usuarios').where({ id }).update({ nome, email, senha })
  return usuario
}

module.exports = {
  buscarEmailUsuario,
  adicionarUsuario,
  buscarIdUsuario,
  usuarioAtualizado
}
