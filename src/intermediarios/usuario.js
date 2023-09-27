const joi = require('joi')
const { buscarEmailUsuario } = require('../repositorios/consultas')

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
    return res.json({ error: error.detail, mensagem: error.message })
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

module.exports = {
  validarCorpo,
  verificarEmailInformado,
}
