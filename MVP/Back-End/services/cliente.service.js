import repository from '../repository/cliente.repository.js'

async function criarCliente(cliente) {
    return await repository.criarCliente(cliente);
}

async function atualizarCliente(cliente) {
    return await repository.atualizarCliente(cliente);
}

async function buscarClientePorId(id) {
    return await repository.buscarClientePorId(id);
}

async function buscarTodosClientes() {
    return await repository.buscarTodosClientes()
}

async function buscarClientePorTelefone(telefone) {
    return await repository.buscarClientePorTelefone(telefone)
}
export default { criarCliente, atualizarCliente, buscarClientePorId, buscarTodosClientes, buscarClientePorTelefone }