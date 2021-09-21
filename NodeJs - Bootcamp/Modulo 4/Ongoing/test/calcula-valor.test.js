const calculaValor = require('../src/calcula-valor.js')
test('Com uma prestação o montante é igual ao Capital', () => {
  const montante = calculaValor.calcularMontante(500, 0.025, 4)

  expect(montante).toBe(538.45)
})

describe('Arredondar', () => {
  test('Arredondar em duas casas decimais', () => {
    const resultado = calculaValor.arredondar(538.4453124999998)
    expect(resultado).toBe(538.45)
  })
})

test('1.005  deve retornar 1.001', () => {
  const resultado = calculaValor.arredondar(1.005)
  expect(resultado).toBe(1.01)
})

describe('Calcular prestacoes', () => {
  test('O numero de parcelas deve ser igual ao numero de prestacoes', () => {
    const numeroPrestacoes = 6
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)
    expect(prestacoes.length).toBe(numeroPrestacoes)
  })
})

test('Uma unica prestacao, valor igual ao montante', () => {
  const numeroPrestacoes = 1

  const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

  expect(prestacoes.length).toBe(numeroPrestacoes)
  expect(prestacoes[0]).toBe(50)
})

test('Duas prestacoes, valor igual a metade  montante', () => {
  const numeroPrestacoes = 2

  const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

  expect(prestacoes.length).toBe(numeroPrestacoes)
  expect(prestacoes[0]).toBe(25)
  expect(prestacoes[1]).toBe(25)
})

test('Valor da soma das prestacoes deve ser igual ao montante com duas casas decimais', () => {
  const numeroPrestacoes = 3
  const montante = 100

  const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)
  expect(prestacoes.length).toBe(numeroPrestacoes)
  const soma = calculaValor.arredondar(prestacoes[0] + prestacoes[1] + prestacoes[2])
  expect(soma).toBe(montante)
})
