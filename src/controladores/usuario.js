const { criptografarSenha } = require('../util/criptografia')
const { gerarToken } = require('../util/jwt')
const {
  adicionarUsuario,
  buscarEmailUsuario,
  usuarioAtualizado,
  buscarIdUsuario,
} = require('../repositorios/consultas')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const senhaCriptografada = await criptografarSenha(senha)
    const usuario = { nome, email, senhaCriptografada }
    const usuarioCadastrado = await adicionarUsuario(usuario)
    delete usuarioCadastrado[0].senha

    return res.status(201).json(usuarioCadastrado)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const loginUsuario = async (req, res) => {
  const { email } = req.body

  try {
    const usuario = await buscarEmailUsuario(email)
    const token = gerarToken({ id: usuario.id }, '1h')
    delete usuario.senha

    return res.status(200).json({ usuario, token })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const atualizarUsuario = async (req, res) => {
  const id = req.usuarioAutenticado
  const { nome, email, senha } = req.body

  try {
    const senhaCriptografada = await criptografarSenha(senha)
    const dadosAtualizados = { id, nome, email, senhaCriptografada }
    const usuario = await usuarioAtualizado(dadosAtualizados)

    return res.status(204).json(usuario)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

const detalharUsuario = async (req, res) => {
  const id = req.usuarioAutenticado

  try {
    const usuario = await buscarIdUsuario(id)
    delete usuario.senha

    return res.status(200).json(usuario)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do Servidor' })
  }
}

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  atualizarUsuario,
  detalharUsuario,
}
