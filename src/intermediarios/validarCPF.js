const validarCPF = (req, res, next) => {
  const { cpf } = req.body
  const stringCPF = cpf.toString().replace(/\D/g, '')
  const digitos = stringCPF.split('').map(Number)

  if (!validarDigitosCpf(digitos)) {
    return res.status(422).json('CPF inválido')
  }

  next()
}

function validarDigitosCpf(digitos) {
  if (digitos.length !== 11) {
    return false
  }

  if (digitos.every((d) => d === digitos[0])) {
    return false
  }

  const soma1 = digitos
    .slice(0, 9)
    .reduce((acc, digit, index) => acc + digit * (10 - index), 0)
  const digito1 = (soma1 * 10) % 11

  if (digito1 !== digitos[9]) {
    return false
  }

  const soma2 = digitos
    .slice(0, 10)
    .reduce((acc, digit, index) => acc + digit * (11 - index), 0)
  const digito2 = (soma2 * 10) % 11

  if (digito2 !== digitos[10]) {
    return false
  }

  return true
}

module.exports = validarCPF
