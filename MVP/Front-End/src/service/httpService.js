import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
});
async function buscarTodosOsProdutos() {
    const {data} = await axiosInstance.get('/produto').catch(message => console.log(message));
    return data;
}

async function buscarUsuarioPorTelefone(telefone) {
    const data = await axiosInstance.get(`/cliente?telefone=${telefone}`).catch(message => console.log(message));
    return data;
}

async function cadastrarProduto(produto) {
    const data = await axiosInstance.post('/produto', JSON.stringify(produto), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(message => console.log(message));
    return data;
}

export default { buscarTodosOsProdutos, buscarUsuarioPorTelefone, cadastrarProduto }