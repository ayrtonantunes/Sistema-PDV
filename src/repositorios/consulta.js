const conexaoBanco = require('../conexao')

const listarDados = (tabela) => {
  const dadosListados = conexaoBanco(tabela)
  return dadosListados
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
  buscarDados,
  adicionarDados,
  editarDados,
  excluirDados,
}
