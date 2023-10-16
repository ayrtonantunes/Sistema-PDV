const validarCPF = (req, res, next) => {
  const { cpf } = req.body
  const stringCPF = cpf.toString().replace(/\D/g, '')
  const digitos = stringCPF.split('').map(Number)

  const resultado = validarDigitosCpf(digitos)

  if (!resultado) {
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

  const digito10 = soma1 % 11 < 2 ? 0 : 11 - (soma1 % 11)

  if (digito10 !== digitos[9]) {
    return false
  }

  const soma2 = digitos
    .slice(0, 10)
    .reduce((acc, digit, index) => acc + digit * (11 - index), 0)

  const digito11 = soma2 % 11 < 3 ? 0 : 11 - (soma2 % 11)

  if (digito11 !== digitos[10]) {
    return false
  }

  return true
}

module.exports = validarCPF
