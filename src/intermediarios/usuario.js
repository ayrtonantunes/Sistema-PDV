const {
  buscarEmailUsuario,
  buscarIdUsuario,
} = require('../repositorios/consultas')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const schemaUsuario = require('../esquema/usuario')

const validarCorpo = async (req, res, next) => {
  const { nome, email, senha } = req.body

  try {
    await schemaUsuario.validateAsync({ nome, email, senha })
    const emailCadastrado = await buscarEmailUsuario(email)

    if (emailCadastrado.length === 1) {
      return res.status(409).json({ mensagem: 'Usuário ou email já existe.' })
    }

    next()
  } catch (error) {
    console.log({ error: error.detail, mensagem: error.message })
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const verificarUsuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.',
    })
  }

  try {
      const { id } = jwt.verify(token, process.env.SENHA_JWT)
    
      const usuario = await buscarIdUsuario(id)
       
      if (usuario.length < 1) {
          return res.status(404).json({ mensagem: 'O usuário não foi encontrado.' })
      }

      delete usuario[0].senha
      
      req.usuario = usuario[0]

      next()
  } catch (error) {
    console.log({ error: error.detail, mensagem: error.message })
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
    const usuario = await buscarEmailUsuario(email)

    if (!email || !senha) {
      return res
        .status(400)
        .json({ mensagem: 'Todos os campos são obrigatórios.' })
    }

    if (usuario.length < 1) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
    }

    const senhaValida = await bcrypt.compare(senha, usuario[0].senha)

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Email e/ou senha inválido(s).' })
    }
    next()
  } catch (error) {
    console.log({ error: error.detail, mensagem: error.message })
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  validarCorpo,
  verificarUsuarioLogado,
  validarCorpoLogin,
}
