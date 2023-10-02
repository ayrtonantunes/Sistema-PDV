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
  const idUsuario = conexaoBanco('usuarios').where({ id }).first()
  return idUsuario
}

const usuarioAtualizado = (dadosAtualizados) => {
  const { id, nome, email, senhaCriptografada } = dadosAtualizados
  const usuario = conexaoBanco('usuarios')
    .where({ id })
    .update({ nome, email, senha: senhaCriptografada })
  return usuario
}

const listarCategorias = () => {
  const categorias = conexaoBanco('categorias')
  return categorias
}

module.exports = {
  buscarEmailUsuario,
  adicionarUsuario,
  buscarIdUsuario,
  usuarioAtualizado,
  listarCategorias,
}
