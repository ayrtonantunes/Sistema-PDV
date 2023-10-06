const validarCorpo = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)

    next()
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensagem: error.message })
    } else {
      return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
    }
  }
}

module.exports = validarCorpo
