const conexaoBanco = require('../config/conexao')

const listarDados = (tabela) => {
  const dadosListados = conexaoBanco(tabela).orderBy('id')
  return dadosListados
}

const filtrarDados = (tabela, campo) => {
  const lista = conexaoBanco(tabela).where(campo)
  return lista
}

const buscarDados = (tabela, campo) => {
  const dados = conexaoBanco(tabela).where(campo).first()
  return dados
}

const adicionarDados = (tabela, dados) => {
  const dadosAdicionados = conexaoBanco(tabela).insert(dados).returning('*')
  return dadosAdicionados
}

const editarDados = (propriedades) => {
  const { tabela, campo, dados } = propriedades
  const dadosEditados = conexaoBanco(tabela).where(campo).update(dados)
  return dadosEditados
}

const excluirDados = (tabela, campo) => {
  const dadosExcluidos = conexaoBanco(tabela).where(campo).del()
  return dadosExcluidos
}

module.exports = {
  listarDados,
  filtrarDados,
  buscarDados,
  adicionarDados,
  editarDados,
  excluirDados,
}
