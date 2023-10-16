const Joi = require('joi')

const esquemaCliente = Joi.object({
  nome: Joi.string().required().messages({
    'string.empty': 'O campo nome é obrigatório.',
    'any.required': 'O campo nome é obrigatório.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'O campo email é obrigatório.',
    'string.email': 'O campo email deve ser um endereço de email válido.',
    'any.required': 'O campo email é obrigatório.',
  }),
  cpf: Joi.alternatives().try(
    Joi.string()
      .pattern(/^\d{11}$/)
      .required()
      .messages({
        'string.empty': 'O campo CPF é obrigatório.',
        'string.pattern.base':
          'O campo CPF deve conter exatamente 11 dígitos numéricos.',
        'any.required': 'O campo CPF é obrigatório.',
      }),
    Joi.number().integer().min(10000000000).max(99999999999).messages({
      'number.min': 'O campo CPF deve conter exatamente 11 dígitos numéricos.',
      'number.max': 'O campo CPF deve conter exatamente 11 dígitos numéricos.',
    })
  ),
  cep: Joi.alternatives().try(
    Joi.string()
      .pattern(/^\d{8}$/)
      .allow('', null)
      .messages({
        'string.pattern.base':
          'O campo CEP deve conter exatamente 8 dígitos numéricos.',
      }),
    Joi.number().integer().min(10000000).max(99999999).messages({
      'number.min': 'O campo cep deve conter exatamente 8 dígitos numéricos.',
      'number.max': 'O campo cep deve conter exatamente 8 dígitos numéricos.',
    })
  ),
  rua: Joi.string().allow('').optional(),
  numero: Joi.alternatives().try(
    Joi.string().allow('').optional(),
    Joi.number().allow('').optional()
  ),
  bairro: Joi.string().allow('').optional(),
  cidade: Joi.string().allow('').optional(),
  estado: Joi.string()
    .pattern(/^[A-Z]{2}$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base':
        'O campo estado deve conter exatamente duas letras maiúsculas.',
    }),
})

module.exports = esquemaCliente
