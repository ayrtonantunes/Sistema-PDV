const { criptografarSenha } = require('../util/criptografia')
const { adicionarUsuario } = require('../repositorios/consultas')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const senhaCriptografada = await criptografarSenha(senha)
    const usuario = { nome, email, senhaCriptografada }
    const usuarioCadastrado = await adicionarUsuario(usuario)
    delete usuarioCadastrado[0].senha

    return res.status(201).json(usuarioCadastrado[0])
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.detail, mensagem: error.message })
  }
}

module.exports = { cadastrarUsuario }
