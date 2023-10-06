const { listarDados } = require('../repositorios/consulta')

const listar = async (req, res) => {
  try {
    const categorias = await listarDados('categorias')
    return res.status(200).json({ categorias })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = { listar }
