/* eslint-disable */
import React, { useState, useEffect } from "react";
import httpService from '../service/httpService.js'

const Modal = (props) => {
    console.log(props.item)
    const [errorMessage, setErroMessage] = useState("");
    const [shop, setShop] = useState({})
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
        const telefone = document.getElementById('userTelefone').value;
        if (!validateFields) {
            return;
        }
        const usuario = await httpService.buscarUsuarioPorTelefone(telefone);
        if (!usuario) {
            updateErrorMessage("Usuário não cadastrado");
            return;
        }
        setUser(usuario);
    }

    function validateFields() {
        const telefone = document.getElementById('userTelefone').value;
        const endereco = document.getElementById('userEndereco').value;
        if (!telefone) {
            updateErrorMessage("É necessário informar um telefone");
            return false;
        }
        if (!endereco) {
            updateErrorMessage("É necessário informar um endereço")
            return false;
        }

        return true;
    }
    function updateErrorMessage(message) {
        setErroMessage(message);
        setShowError(!showError);
    }

    async function reserveProduct(evt) {
        evt.preventDefault();
        try {

            if (!validateFields()) {
                return;
            }

            let jsonReserved = fillReservedProduct();
            const res = await httpService.cadastrarPedido(jsonReserved);
            setErroMessage("Pedido cadastrado com sucesso");
            setShowError(!showError);

        } catch (err) {
            setErroMessage(err);
            setShowError(!showError);
        }
    }

    function fillReservedProduct() {
        console.log(user)
        try {
            let objReserved = {
                "id_cliente": user._id,
                "dt_reserva": Date.now(),
                "produtos": props.item
            };
            return objReserved;
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
                    <label>Telefone</label><input onBlur={searchUserAndUpdateScreen} className="formInput" id="userTelefone"></input>
                    <label>Nome</label><input className="formInput" id="userNome"></input>
                    <label>Endereço</label><input className="formInput" id="userEndereco"></input>
                </form>
                <div className="flex formModal">
                    <details><summary>Carrinho - Produtos</summary>
                        <table className="table">
                            {props.item.map((itens) => {
                                return <tr key={itens._id} id={itens._id}>
                                    <td>{itens.qtdReservado}</td>
                                    <td>{itens.nome} </td>
                                    <td>R$ {itens.qtdReservado * itens.valor}</td>
                                </tr>

                            })}
                        </table>
                    </details>
                </div>
                <button onClick={reserveProduct} className="btnPostivo">Fechar Reserva</button>
                <div>  {!!showError && <p className="mensagemErro">{errorMessage}</p>}</div>
            </div>
        </div>)
}

export default Modal;