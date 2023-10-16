const { buscarDados } = require('../repositorios/consulta')
const { verificarToken } = require('../utils/jwt')

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
    const usuario = await buscarDados('usuarios', { id })

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

module.exports = validarToken
