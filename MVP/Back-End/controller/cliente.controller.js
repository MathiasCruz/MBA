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

async function buscarCliente(req, res, next) {
    try {
        const id = req.query.id;
        const telefone = req.query.telefone;
        if (id) {
            return res.send(await service.buscarClientePorId(id));
        }
        else if (telefone) {
            return res.send(await service.buscarClientePorTelefone(telefone))
        }
        res.send(await service.buscarTodosClientes());
    }
    catch (err) {
        next(err)
    }
}

export default { criarCliente, atualizarCliente, buscarCliente }