const conexaoBanco = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_NAME,
  },
})

module.exports = conexaoBanco