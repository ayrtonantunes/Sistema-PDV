const {
  buscarEmailUsuario,
  buscarIdUsuario,
} = require('../repositorios/consultas')
const esquemaUsuario = require('../esquema/usuario')
const { verificarToken } = require('../util/jwt')
const { compararSenha } = require('../util/criptografia')

const validarCorpo = async (req, res, next) => {
  const dadosUsuario = req.body

  try {
    await esquemaUsuario.validateAsync(dadosUsuario)

    next()
  } catch (error) {
    return res.status(500).json({ mensagem: error.message })
  }
}

const verificarEmail = async (req, res, next) => {
  const idUsuarioLogado = req.usuarioAutenticado
  const { email } = req.body

  try {
    const emailEncontrado = await buscarEmailUsuario(email)

    if (!emailEncontrado || emailEncontrado.id === idUsuarioLogado) {
      return next()
    } else if (emailEncontrado) {
      if (idUsuarioLogado === undefined) {
        return res.status(409).json({
          mensagem: 'Usuário ou Email já existe',
        })
      }

      return res.status(409).json({
        mensagem:
          'O e-mail informado já está sendo utilizado por outro usuário.',
      })
    }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const validarToken = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.',
    })
  }

  try {
    const token = authorization.split(' ')[1]
    const { id } = verificarToken(token)
    const usuario = await buscarIdUsuario(id)

    if (!usuario) {
      return res.status(404).json({ mensagem: 'O usuário não foi encontrado.' })
    }

    req.usuarioAutenticado = usuario.id

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message:
          'O Token de acesso expirou. Faça login para acessar esta funcionalidade.',
      })
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message:
          'Para acessar este recurso um token de autenticação válido deve ser enviado.',
      })
    } else {
      return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
    }
  }
}

const validarCorpoLogin = async (req, res, next) => {
  const { email, senha } = req.body

  try {
    if (!email || !senha) {
      return res.status(422).json({
        mensagem: 'Todos os campos são obrigatórios.',
      })
    }

    const usuario = await buscarEmailUsuario(email)

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
    }
    const senhaValida = await compararSenha(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Email e/ou senha inválido(s).' })
    }

    next()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  validarCorpo,
  verificarEmail,
  validarToken,
  validarCorpoLogin,
}
