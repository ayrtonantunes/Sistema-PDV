const joi = require('joi')

const esquemaProduto = joi.object({
  descricao: joi.string().required().messages({
    'string.empty': 'O campo descrição é obrigatório.',
    'string.base': 'O campo descrição deve ser do tipo string.',
    'any.required': 'O campo descrição é obrigatória.',
  }),
  quantidade_estoque: joi.number().required().messages({
    'string.empty': 'O campo quantidade_estoque é obrigatório.',
    'number.base': 'O campo quantidade_estoque deve ser um número.',
    'any.required': 'O campo quantidade_estoque é obrigatório.',
  }),
  valor: joi.number().required().messages({
    'string.empty': 'O campo valor é obrigatório.',
    'number.base': 'O campo valor deve ser um número.',
    'any.required': 'O campo valor é obrigatório.',
  }),
  categoria_id: joi.number().required().messages({
    'string.empty': 'O campo categoria_id é obrigatório.',
    'number.base': 'O campo categoria_id deve ser um número.',
    'any.required': 'O campo categoria_id é obrigatório.',
  }),
  produto_imagem: joi.number().messages({
    'string.empty': 'O campo produto_imagem é obrigatório.',
    'string.base': 'O campo produto_imagem é obrigatório.',
  }),
})

module.exports = esquemaProduto
