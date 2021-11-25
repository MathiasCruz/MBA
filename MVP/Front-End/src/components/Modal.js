/* eslint-disable */
import React, { useState, useEffect } from "react";
import httpService from '../service/httpService.js'

const Modal = (props) => {
    const [errorMessage, setErroMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            document.getElementById("userNome").value = user.nome;
            document.getElementById("userEndereco").value = user.endereco;
        }
    }, [user]);

    async function searchUserAndUpdateScreen(evt) {
        evt.preventDefault();

        if(!validateFields){
            return;
        }
        const usuario = await httpService.buscarUsuarioPorTelefone(telefone);
        if (!usuario) {
            updateErrorMessage("Usuário não cadastrado");
            return;
        }
        setUser(usuario);
    }

    function validateFields(){
        const telefone = document.getElementById('userTelefone').value;
        const endereco =  document.getElementById('userEndereco').value;
        if (!telefone) {
            updateErrorMessage("É necessário informar um telefone");
            return false;
        }
        if(!endereco){
            updateErrorMessage("É necessário informar um endereço")
            return false;
        }

        return true;
    }
    function updateErrorMessage(message) {
        setErroMessage(message);
        setShowError(!showError);
    }

    async function reserveProduct() {
        evt.preventDefault();
        
        if(!validateFields()){
            return;
        }
        let jsonReserved = fillReserveProduct();
        const  res = await httpService.cadastrarPedido(jsonReserved);
    
    }

    function fillReserveProduct() {
        try {
            objReserved = {
                "id_cliente": user._objectId,
                "dt_reserva": Date.now(),
                "produtos": []
            };

            props.map((item) => {
                objReserved.produtos.push(item);
            });
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='flex center vcenter full'>
            <div className="modal formModal between">
                <div className="flex between">
                    <strong className="formModal" > Resumo de Pedido</strong>
                    <button className="btnFechar" onClick={props.HandleModal}>X</button>
                </div>
                <form className="formModal">
                    <label>Telefone</label><input className="formInput" id="userTelefone"></input>
                    <button onClick={searchUserAndUpdateScreen}>Buscar cadastro</button>
                    <label>Nome</label><input className="formInput" id="userNome"></input>
                    <label>Endereço</label><input className="formInput" id="userEndereco"></input>
                </form>
                <div className="flex formModal divImg">
                    {props.item.map((itens) => {
                        return <span>{`${itens.nome} + 1`}</span>
                        // <div className="divImg">
                        //     <img alt="" src={`/${itens.categoria}.png`} className="produtoImg" />
                        // </div>
                    })}
                </div>
                <button onClick={reserveProduct}>Fechar Reserva</button>
                <div>  {!!showError && <p className="mensagemErro">{errorMessage}</p>}</div>
            </div>
        </div>)
}

export default Modal;