require('dotenv').config()
const express = require('express')
const rotas = require('./rotas')

const app = express()
const PORTA = process.env.PORT || 3000

app.use(express.json())

app.use(rotas)

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`)
})
