const Joi = require('joi')

const esquemaPedido = Joi.object({
  cliente_id: Joi.alternatives().try(
    Joi.string().required().messages({
      'string.empty': 'O campo cliente_id é obrigatório.',
      'any.required': 'O campo cliente_id é obrigatório.',
    }),
    Joi.number().required().messages({
      'number.base': 'O campo cliente_id deve ser um número.',
      'any.required': 'O campo cliente_id é obrigatório.',
    })
  ),
  observacao: Joi.string().allow('').optional(),
  pedido_produtos: Joi.array().min(1).required().messages({
    'array.base': 'O campo pedido_produtos deve ser um array.',
    'array.min': 'O campo pedido_produtos deve conter pelo menos um produto.',
    'any.required': 'O campo pedido_produtos é obrigatório.',
  }),
  produto_id: Joi.alternatives().try(
    Joi.string().required().messages({
      'string.empty': 'O campo produto_id é obrigatório.',
      'any.required': 'O campo produto_id é obrigatório.',
    }),
    Joi.number().required().messages({
      'number.base': 'O campo produto_id deve ser um número.',
      'any.required': 'O campo produto_id é obrigatório.',
    })
  ),
  quantidade_produto: Joi.alternatives().try(
    Joi.string().required().valid(Joi.number().min(1)).messages({
      'string.empty': 'O campo quantidade_produto é obrigatório.',
      'any.required': 'O campo quantidade_produto é obrigatório.',
      'any.only': 'O campo quantidade_produto deve ser um número maior que 0.',
    }),
    Joi.number().required().min(1).messages({
      'number.base': 'O campo quantidade_produto deve ser um número.',
      'number.min': 'O campo quantidade_produto deve ser maior que 0.',
      'any.required': 'O campo quantidade_produto é obrigatório.',
    })
  ),
})

module.exports = esquemaPedido
