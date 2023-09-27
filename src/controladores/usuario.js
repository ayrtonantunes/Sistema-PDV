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

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body

  try {
      const usuario = await pool.query('select * from usuarios where email = $1', [email])

      if (!email || !senha) {
          return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.'})
      }

      if (usuario.rowCount < 1) {
          return res.status(404).json({ mensagem: 'Usuário e/ou senha inválido(s).'})
      }

      const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

      if (!senhaValida) {
          return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).'})
      }

      const token = jwt.sign({ id: usuario.rows[0].id, }, senhaJwt, { expiresIn: '1h' })

      const { senha: _, ...usuarioLogado } = usuario.rows[0]

      return res.status(200).json({ usuario: usuarioLogado, token })

  } catch (error) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = { 
  cadastrarUsuario,
  loginUsuario
 }
