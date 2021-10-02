const clienteRepo = require('../repository/cliente.repository.js')

async function CriarCliente(cliente){
    return await clienteRepo.criarCliente(cliente)
}

async function AtualizarCliente(cliente){
    return await clienteRepo.atualizarCliente(cliente)
}
module.exports = {
    CriarCliente,
    AtualizarCliente
}