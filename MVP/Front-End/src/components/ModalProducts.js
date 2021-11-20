import React, { useState } from "react";
import httpService from "../service/httpService";

const ModalProducts = (props) => {
    const [message, setMessage] = useState("");

    async function handleCadastrarProduto() {
        let objProduto = {
            nome: document.getElementById("nomeProduto").value,
            quantidade: document.getElementById("qtdProduto").value,
            categoria: document.getElementById("categoriaProd").value, 
            valor: document.getElementById("valorProduto").value
        }
        const retorno = await httpService.cadastrarProduto(objProduto);
        if(retorno){
            setMessage("Produto cadastrado com sucesso")
        }
    }
    return (<>
        <div className='flex center vcenter full'>
            <div className="modal formModal between">
                <div className="flex between">
                    <strong className="formModal" >Cadastrar Produto</strong>
                    <button className="btnFechar" onClick={props.HandleModal}>X</button>
                </div>
                <form className="formModal">
                    <label>Nome</label><input className="formInput" id='nomeProduto'></input>
                    <label>Quantidade</label><input className="formInput" id="qtdProduto"></input>
                    <label>categoria</label><input className="formInput" id="categoriaProd"></input>
                    <label>Valor</label><input className="formInput" id="valorProduto"></input>
                </form>
                <button onClick={handleCadastrarProduto}>Cadastrar Produto</button>
                <p>{message}</p>
            </div></div></>)
}

export default ModalProducts;