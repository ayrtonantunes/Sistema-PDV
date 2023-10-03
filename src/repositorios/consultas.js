const conexaoBanco = require('../conexao')

const buscarEmailUsuario = (email) => {
  const dadosUsuario = conexaoBanco('usuarios').where({ email }).first()
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
  const dadosUsuario = conexaoBanco('usuarios').where({ id }).first()
  return dadosUsuario
}

const usuarioAtualizado = (dadosAtualizados) => {
  const { id, nome, email, senhaCriptografada } = dadosAtualizados
  const resultado = conexaoBanco('usuarios')
    .where({ id })
    .update({ nome, email, senha: senhaCriptografada })
  return resultado
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
