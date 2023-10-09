const joi = require('joi')

const esquemaProduto = joi.object({
  descricao: joi.string().required().messages({
    'string.base': 'O campo descrição deve ser do tipo string.',
    'any.required': 'O campo descrição é obrigatória.',
  }),
  quantidade_estoque: joi.number().required().messages({
    'number.base': 'O campo quantidade_estoque deve ser um número.',
    'any.required': 'O campo quantidade_estoque é obrigatório.',
  }),
  valor: joi.number().required().messages({
    'number.base': 'O campo valor deve ser um número.',
    'any.required': 'O campo valor é obrigatório.',
  }),
  categoria_id: joi.number().required().messages({
    'number.base': 'O campo categoria_id deve ser um número.',
    'any.required': 'O campo categoria_id é obrigatório.',
  }),
})

module.exports = esquemaProduto
