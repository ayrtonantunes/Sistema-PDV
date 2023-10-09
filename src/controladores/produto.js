const {
  listarDados,
  buscarDados,
  adicionarDados,
  editarDados,
  excluirDados,
} = require('../repositorios/consulta')

const listarProdutos = async (req, res) => {
  try {
    const produtos = await listarDados('produtos')
    return res.status(200).json({ produtos })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const cadastrarProduto = async (req, res) => {
  const produto = req.body

  try {
    const categoriaEncontrada = await buscarDados('categorias', {
      id: produto.categoria_id,
    })

    if (!categoriaEncontrada) {
      return res.status(404).json({
        mensagem: 'A categoria informada não existe.',
      })
    }

    const [produtoCadastrado] = await adicionarDados('produtos', produto)

    return res.status(201).json(produtoCadastrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const editarProduto = async (req, res) => {
  const id = Number(req.params.id)
  const novosDados = req.body

  try {
    const produtoEncontrado = await buscarDados('produtos', { id })

    if (!produtoEncontrado) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' })
    }

    const categoriaEncontrada = await buscarDados('categorias', {
      id: novosDados.categoria_id,
    })

    if (!categoriaEncontrada) {
      return res.status(404).json({ mensagem: 'Categoria não encontrado.' })
    }

    const propriedades = {
      tabela: 'produtos',
      campo: { id },
      dados: novosDados,
    }

    await editarDados(propriedades)

    return res.status(204).json()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const detalharProduto = async (req, res) => {
  const id = req.params
  try {
    const dadosProduto = await buscarDados('produtos', id)

    if (!dadosProduto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' })
    }

    return res.status(200).json(dadosProduto)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const excluirProduto = async (req, res) => {
  const { id } = req.params
  try {
    const produtoEncontrado = await buscarDados('produtos', { id })

    if (!produtoEncontrado) {
      return res.status(404).json({
        mensagem: 'O produto informado não existe.',
      })
    }

    await excluirDados('produtos', { id })

    return res.status(204).json()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  listarProdutos,
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  excluirProduto,
}
