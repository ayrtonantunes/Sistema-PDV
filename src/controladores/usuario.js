const { criptografarSenha } = require('../util/criptografia')
const {
  adicionarUsuario,
  buscarEmailUsuario,
} = require('../repositorios/consultas')
const jwt = require('jsonwebtoken')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const senhaCriptografada = await criptografarSenha(senha)
    const usuario = { nome, email, senhaCriptografada }
    const usuarioCadastrado = await adicionarUsuario(usuario)
    delete usuarioCadastrado[0].senha

    return res.status(201).json(usuarioCadastrado[0])
  } catch (error) {
    console.log({ error: error.detail, mensagem: error.message })
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const loginUsuario = async (req, res) => {
  const { email } = req.body

  try {
    const usuario = await buscarEmailUsuario(email)

    const token = jwt.sign({ id: usuario[0].id }, process.env.SENHA_JWT, {
      expiresIn: '1h',
    })

    const { senha: _, ...usuarioLogado } = usuario[0]

    return res.status(200).json({ usuario: usuarioLogado, token })
  } catch (error) {
    console.log({ error: error.detail, mensagem: error.message })
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  cadastrarUsuario,
  loginUsuario,
}
