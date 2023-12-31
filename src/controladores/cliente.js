const {
  buscarDados,
  adicionarDados,
  listarDados,
  editarDados,
} = require('../repositorios/consulta')

const listarCliente = async (req, res) => {
  try {
    const clientes = await listarDados('clientes')
    return res.status(200).json({ clientes })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const cadastrarCliente = async (req, res) => {
  const { email, cpf } = req.body
  const dadosCliente = req.body

  try {
    const emailEncontrado = await buscarDados('clientes', { email })

    if (emailEncontrado) {
      return res.status(409).json({
        mensagem:
          'O e-mail informado já está sendo utilizado por outro cliente.',
      })
    }

    const cpfEncontrado = await buscarDados('clientes', { cpf })

    if (cpfEncontrado) {
      return res.status(409).json({
        mensagem: 'O cpf informado já está sendo utilizado por outro cliente.',
      })
    }

    const [clienteCadastrado] = await adicionarDados('clientes', dadosCliente)

    return res.status(201).json(clienteCadastrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const editarCliente = async (req, res) => {
  const id = Number(req.params.id)
  const novosDados = req.body

  try {
    const clienteEncontrado = await buscarDados('clientes', { id })

    if (!clienteEncontrado) {
      return res.status(404).json({
        mensagem: 'Cliente não encontrado.',
      })
    }

    const email = novosDados.email
    const emailEncontrado = await buscarDados('clientes', { email })

    if (emailEncontrado && emailEncontrado?.id !== id) {
      return res.status(409).json({
        mensagem:
          'O e-mail informado já está sendo utilizado por outro usuário.',
      })
    }

    const cpf = novosDados.cpf
    const cpfEncontrado = await buscarDados('clientes', { cpf })

    if (cpfEncontrado && cpfEncontrado?.id !== id) {
      return res.status(409).json({
        mensagem: 'O cpf informado já está sendo utilizado por outro usuário.',
      })
    }

    const dadosAtualizados = {
      tabela: 'clientes',
      campo: { id },
      dados: novosDados,
    }

    await editarDados(dadosAtualizados)

    return res.status(204).json()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const detalharCliente = async (req, res) => {
  const id = req.params
  try {
    const dadosCliente = await buscarDados('clientes', id)

    if (!dadosCliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }

    return res.status(200).json(dadosCliente)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  listarCliente,
  cadastrarCliente,
  editarCliente,
  detalharCliente,
}
