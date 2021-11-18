import service from '../services/cliente.service.js'

async function criarCliente(req, res, next) {
    try {
        const cliente = req.body;
        if (!cliente.nome && !cliente.telefone) {

            throw new Error("Nome e telefone");
        }

        res.send(await service.criarCliente(cliente));
    }
    catch (err) {
        next(err);
    }
}

async function atualizarCliente(req, res, next) {
    try {
        const cliente = req.body;
        if (!cliente.id || !cliente.nome || !cliente.telefone) {

            throw new Error("Nome, telefone e ID");

        }

        res.send(await service.atualizarCliente(cliente));
    } catch (err) {
        next(err)
    }
}

async function buscarClientePorId(req, res, next) {
    try {
        const id = req.params.id;
        if (!id) {
            throw new Error("Id do cliente não especificado");
        }
        res.send(await service.buscarClientePorId(id));
    }
    catch (err) {
        next(err)
    }
}
async function buscarClientePorTelefone(req, res, next) {
    try { 
        const telefone = req.params.telefone;
        if(!telefone){
            throw new Error("parametro telefone é obrigatório");
        }
        res.send(await service.buscarClientePorTelefone(telefone));
    }
    catch (err) {
        next(err)
    }
}

async function buscarTodosClientes(req, res, next) {
    try {
        res.send(await service.buscarTodosClientes())
    } catch (err) {
        next(err)
    }
}


export default { criarCliente, atualizarCliente, buscarClientePorId, buscarTodosClientes,buscarClientePorTelefone }