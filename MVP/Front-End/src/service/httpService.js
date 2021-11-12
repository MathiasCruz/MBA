const url = "http://localhost:3001"

function buscarTodosOsProdutos() {
    return fetch(url + "/produto", {
        method: "GET"
    }).then(HandleResponse)
}

function HandleResponse(resp) {
    if (resp.ok) {
        return resp.json();
    }
    throw new Error(resp.statusText);
}

export default {buscarTodosOsProdutos}