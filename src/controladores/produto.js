const {
  listarDados,
  buscarDados,
  adicionarDados,
  editarDados,
  excluirDados,
  filtrarDados,
} = require('../repositorios/consulta')
const { uploadImagem, excluirImagem } = require('../config/aws_sdk')
const { extrairBaseUrl } = require('../utils/funcoes')

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query

  try {
    if (categoria_id) {
      const produtos = await filtrarDados('produtos', { categoria_id })
      return res.status(200).json({ produtos })
    }

    const produtos = await listarDados('produtos')
    return res.status(200).json({ produtos })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const cadastrarProduto = async (req, res) => {
  const produto = req.body
  const { originalname, mimetype, buffer } = req.file || {}

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

    if (!req.file) {
      return res.status(201).json(produtoCadastrado)
    }

    const { id } = produtoCadastrado
    const imagem = await uploadImagem(
      `produtos/${id}/${originalname}`,
      buffer,
      mimetype
    )

    const baseUrl = `https://f005.backblazeb2.com/file/desafio-final-t04`
    produto.produto_imagem = `${baseUrl}/${imagem.path}`

    const cadastroCompleto = {
      tabela: 'produtos',
      campo: { id },
      dados: produto,
    }

    await editarDados(cadastroCompleto)

    return res.status(201).json(cadastroCompleto)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const editarProduto = async (req, res) => {
  const id = Number(req.params.id)
  const novosDados = req.body
  const { originalname, mimetype, buffer } = req.file || {}

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

    const url = produtoEncontrado.produto_imagem

    if (url !== null) {
      const nomeRef = extrairBaseUrl(url)
      await excluirImagem(nomeRef)
      novosDados.produto_imagem = null
    }

    if (req.file) {
      const nomeRef = await uploadImagem(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      )

      const baseUrl = `https://f005.backblazeb2.com/file/desafio-final-t04`

      novosDados.produto_imagem = `${baseUrl}/${nomeRef.path}`
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

    const produtoVendido = await buscarDados('pedido_produtos', {
      produto_id: id,
    })

    if (produtoVendido) {
      return res.status(400).json({
        mensagem: 'Há pedidos em amdamento com este produto',
      })
    }

    const url = produtoEncontrado.produto_imagem

    if (url !== null) {
      const nomeRef = extrairBaseUrl(url)
      await excluirImagem(nomeRef)
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
