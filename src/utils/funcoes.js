const transportador = require('../config/email')
const compiladorHtml = require('./compilador.html')

const extrairBaseUrl = (url) => {
  const dividirUrl = url.split('/')
  const nomeRef = dividirUrl.slice(-3).join('/')
  return nomeRef
}

const enviarEmail = async (dados) => {
  const { cliente, observacao, produtosPedido, valor_total } = dados

  const produtosHTML = produtosPedido
    .map(
      (produto) => `
    <tr>
        <td>${produto.pedido_id}</td>
        <td>${produto.produto_id}</td>
        <td>${produto.quantidade_produto}</td>
        <td>${produto.valor_produto}</td>
    </tr>`
    )
    .join('')

  const html = await compiladorHtml('./src/templates/pedido.html', {
    cliente: {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      cep: cliente.cep,
      rua: cliente.rua,
      numero: cliente.numero,
      bairro: cliente.bairro,
      cidade: cliente.cidade,
      estado: cliente.estado,
    },
    observacao,
    produtosPedido: produtosHTML,
    valor_total,
  })

  transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${cliente.nome} <${cliente.email}>`,
    subject: 'Compra Realizada com Sucesso!',
    html,
  })
}

module.exports = {
  extrairBaseUrl,
  enviarEmail,
}
