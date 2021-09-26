const request = require('supertest')
const app = require('../src/app.js')

describe('Testes de Integração', () => {
  test('responder http 200 na raiz ', () => {
    return request(app).get('/')
      .then(res => expect(res.status).toBe(200))
  })
})
