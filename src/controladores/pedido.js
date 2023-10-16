const {
  filtrarDados,
  buscarDados,
  editarDados,
  adicionarDados,
  listarDados,
} = require('../repositorios/consulta')
const { enviarEmail } = require('../utils/funcoes')

const listarPedidos = async (req, res) => {
  const id = req.query.pedido_id

  try {
    if (id) {
      const pedidos = await filtrarDados('pedidos', { id })
      const pedido_produtos = await filtrarDados('pedido_produtos', {
        pedido_id: id,
      })
      return res.status(200).json({ pedidos, pedido_produtos })
    }

    const pedidos = await listarDados('pedidos')

    return res.status(200).json({ pedidos })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body

  try {
    const cliente = await buscarDados('clientes', { id: cliente_id })

    if (!cliente) {
      return res.status(404).json({
        mensagem: 'Cliente não existe.',
      })
    }

    let valor_total = 0

    for (const produtoPedido of pedido_produtos) {
      const { produto_id, quantidade_produto } = produtoPedido

      const produto = await buscarDados('produtos', { id: produto_id })

      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não existe.' })
      }

      if (quantidade_produto < 1) {
        return res.status(400).json({
          mensagem: 'Todo produto listado deve conter pelo menos uma unidade.',
        })
      }

      if (quantidade_produto > produto.quantidade_estoque) {
        return res.status(400).json({
          mensagem: `${produto.descricao} (id: ${produto.id}). Quantidade insuficiente, há ${produto.quantidade_estoque} unidades em estoque`,
        })
      }

      valor_total += quantidade_produto * produto.valor

      const atualizarEstoque = {
        quantidade_estoque: produto.quantidade_estoque - quantidade_produto,
      }

      const vendido = {
        tabela: 'produtos',
        campo: { id: produto_id },
        dados: atualizarEstoque,
      }

      await editarDados(vendido)
    }

    const dadosCliente = {
      cliente_id,
      observacao,
      valor_total,
    }

    const [pedido] = await adicionarDados('pedidos', dadosCliente)

    for (const produtoPedido of pedido_produtos) {
      const { produto_id, quantidade_produto } = produtoPedido

      const produto = await buscarDados('produtos', { id: produto_id })

      const dadosProduto = {
        pedido_id: pedido.id,
        produto_id,
        quantidade_produto,
        valor_produto: produto.valor,
      }

      await adicionarDados('pedido_produtos', dadosProduto)
    }

    const produtosPedido = await filtrarDados('pedido_produtos', {
      pedido_id: pedido.id,
    })

    const propriedades = {
      tabela: 'pedidos',
      campo: { id: pedido.id },
      dados: {
        cliente_id,
        observacao,
        valor_total,
      },
    }

    await editarDados(propriedades)
    const pedidoCadastrado = { cliente, observacao, produtosPedido, valor_total }
    enviarEmail(pedidoCadastrado)

    return res.status(200).json(pedidoCadastrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  listarPedidos,
  cadastrarPedido,
}
