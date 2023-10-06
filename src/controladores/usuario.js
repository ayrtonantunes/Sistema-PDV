const { criptografarSenha, compararSenha } = require('../util/criptografia')
const { gerarToken } = require('../util/jwt')
const {
  buscarDados,
  adicionarDados,
  editarDados,
} = require('../repositorios/consulta')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const emailEncontrado = await buscarDados('usuarios', { email })

    if (emailEncontrado) {
      return res.status(409).json({ mensagem: 'Usuário ou Email já existe' })
    }

    const senhaCriptografada = await criptografarSenha(senha)
    const usuario = { nome, email, senha: senhaCriptografada }
    const [usuarioCadastrado] = await adicionarDados('usuarios', usuario)
    delete usuarioCadastrado.senha

    return res.status(201).json(usuarioCadastrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await buscarDados('usuarios', { email })

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Email e/ou senha inválido(s).' })
    }

    const senhaValida = await compararSenha(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Email e/ou senha inválido(s).' })
    }

    const token = gerarToken({ id: usuario.id }, '1h')
    delete usuario.senha

    return res.status(200).json({ usuario, token })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const detalharUsuario = async (req, res) => {
  const id = req.usuarioAutenticado

  try {
    const usuario = await buscarDados('usuarios', { id })
    delete usuario.senha

    return res.status(200).json(usuario)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const editarUsuario = async (req, res) => {
  const id = req.usuarioAutenticado
  const { nome, email, senha } = req.body

  try {
    const emailEncontrado = await buscarDados('usuarios', { email })

    if (emailEncontrado && emailEncontrado.id !== id) {
      return res.status(409).json({
        mensagem:
          'O e-mail informado já está sendo utilizado por outro usuário.',
      })
    }

    const senhaCriptografada = await criptografarSenha(senha)

    const propriedades = {
      tabela: 'usuarios',
      campo: { id },
      dados: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    }

    await editarDados(propriedades)

    return res.status(204).json()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  editarUsuario,
}
