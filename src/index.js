require('dotenv').config()
const express = require('express')
const rotasCategoria = require('./rotas/categoria')
const rotasUsuario = require('./rotas/usuario')
const rotasCliente = require('./rotas/cliente')
const rotasProduto = require('./rotas/produto')
const cors = require('cors')

const app = express()
const PORTA = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(rotasCategoria)
app.use(rotasUsuario)
app.use(rotasCliente)
app.use(rotasProduto)

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`)
})
