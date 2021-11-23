/* eslint-disable */
import React, { useState } from "react";
import httpService from '../service/httpService.js'

const Modal = (props) => {
    const [errorMessage, setErroMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [user, setUser] = useState({});

    async function searchUserAndUpdateScreen(evt) {
        evt.preventDefault();
        const telefone = document.getElementById('userTelefone').value;
        if (!telefone) {
            setErroMessage("É necessário informar um telefone");
            setShowError(!showError);
            return
        }
        const usuario = await httpService.buscarUsuarioPorTelefone(telefone);
        if (!usuario) {
            setErroMessage("Usuário não cadastrado");
            setShowError(!showError);
        }
        setUser(usuario);
    }

    console.log(props)
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
                    <label>Nome</label><input className="formInput"></input>
                </form>
                <div className="flex formModal divImg">
                    {props.item.map((itens) => {
                        return <span>{`${itens.nome} + 1`}</span>
                        // <div className="divImg">
                        //     <img alt="" src={`/${itens.categoria}.png`} className="produtoImg" />
                        // </div>
                    })}
                </div>
                <button>Fechar Reserva</button>
                <div>  {!!showError && <p className="mensagemErro">{errorMessage}</p>}</div>
            </div>
        </div>)
}

export default Modal;