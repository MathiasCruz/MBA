const calculaValor = require('../src/calcula-valor.js');
test('Com uma prestação o montante é igual ao Capital', () => {
  const montante = calculaValor.calcularMontante(100, 0.0175, 1);

  expect(montante).toBe(100);
});
