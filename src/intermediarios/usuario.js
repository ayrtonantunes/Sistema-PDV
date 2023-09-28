const joi = require('joi')
const { buscarEmailUsuario, buscarIdUsuario } = require('../repositorios/consultas')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const validarCorpo = async (req, res, next) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res
      .status(422)
      .json({ mensagem: 'Todos os campos são obrigatórios' })
  }

  try {
    const schemaUsuario = joi.object({
      nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
      }),
      email: joi.string().email().required().messages({
        'string.email': 'O campo email deve ser um endereço de email válido.',
        'any.required': 'O campo email é obrigatório.',
      }),
      senha: joi.string().min(5).required().messages({
        'string.min': 'A senha deve ter pelo menos 5 caracteres.',
        'any.required': 'O campo senha é obrigatório.',
      }),
    })

    await schemaUsuario.validateAsync({ nome, email, senha })
    next()
  } catch (error) {
    return res.status(500).json({ error: error.detail, mensagem: error.message })
  }
}

const verificarEmailInformado = async (req, res, next) => {
  const { email } = req.body
  try {
    const emailCadastrado = await buscarEmailUsuario(email)

    if (emailCadastrado.length === 1) {
      return res.status(409).json({ mensagem: 'Usuário ou email já existe.' })
    }
    next()
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.detail, mensagem: error.message })
  }
}

const verificarUsuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers
  
  if (!authorization) {
      return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
  }
  
  const token = authorization.split(' ')[1]

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
      
      return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
  }
}

const validarCorpoLogin = async (req, res, next) => {
  const { email, senha } = req.body

  try {
    const usuario = await buscarEmailUsuario(email)

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.'})
    }

    if (usuario.length < 1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.'})
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario[0].senha)

    if (!senhaValida) {
        return res.status(401).json({ mensagem: 'Email e/ou senha inválido(s).'})
    }
  } catch (error) {
    return res.status(500).json({ error: error.detail, mensagem: error.message })
  }

  next()
}

module.exports = {
  validarCorpo,
  verificarEmailInformado,
  verificarUsuarioLogado,
  validarCorpoLogin
}
