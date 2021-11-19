import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
  });
async function buscarTodosOsProdutos() {
    try{
     const {data } = await axiosInstance.get('/produto').catch(message => console.log(message));
     return data;
    } catch (err) {
        console.log(err);
    }
}

async function  HandleResponse(resp) {
    if (resp.ok) {
        return await resp.json();
    }
    throw new Error(resp.statusText);
}

export default {buscarTodosOsProdutos}