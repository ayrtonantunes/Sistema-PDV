const conexaoBanco = require('../conexao')

const buscarEmailUsuario = (email) => {
  return conexaoBanco('usuarios').select('*').where({ email })
}

const adicionarUsuario = (usuario) => {
  const { nome, email, senhaCriptografada } = usuario
  return conexaoBanco('usuarios')
    .insert({ nome, email, senha: senhaCriptografada })
    .returning('*')
}

module.exports = {
  buscarEmailUsuario,
  adicionarUsuario,
}
