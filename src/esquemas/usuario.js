const joi = require('joi')

const esquemaUsuario = joi.object({
  nome: joi.string().required().messages({
    'string.empty': 'O campo nome é obrigatório.',
    'string.base': 'O campo nome deve ser do tipo string.',
    'any.required': 'O campo nome é obrigatório.',
  }),
  email: joi.string().email().required().messages({
    'string.empty': 'O campo email é obrigatório.',
    'string.email': 'O campo email deve ser um endereço de email válido.',
    'any.required': 'O campo email é obrigatório.',
  }),
  senha: joi.string().min(5).required().messages({
    'string.empty': 'O campo senha é obrigatório.',
    'string.base': 'O campo senha deve ser do tipo string.',
    'string.min': 'A senha deve ter pelo menos 5 caracteres.',
    'any.required': 'O campo senha é obrigatório.',
  }),
})

const esquemaLogin = joi.object({
  email: joi.string().email().required().messages({
    'string.empty': 'O campo email é obrigatório.',
    'string.email': 'O campo email deve ser um endereço de email válido.',
    'any.required': 'O campo email é obrigatório.',
  }),
  senha: joi.string().min(5).required().messages({
    'string.empty': 'Email e/ou senha inválido(s).',
    'string.base': 'O campo senha deve ser do tipo string.',
    'string.min': 'Email e/ou senha inválido(s).',
    'any.required': 'O campo senha é obrigatório.',
  }),
})

module.exports = { esquemaUsuario, esquemaLogin }
