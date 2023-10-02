const { listarCategorias } = require('../repositorios/consultas')

const listar = async (req, res) => {
  try {
    const categorias = await listarCategorias()
    return res.status(200).json({ categorias })
  } catch (error) {
    console.log({ error: error.detail, mensagem: error.message })
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = { listar }
