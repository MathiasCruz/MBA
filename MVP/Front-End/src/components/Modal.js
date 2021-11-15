/* eslint-disable */
import React from "react";
const Modal = (props) => {

    console.log(props)
    return (
        <div className='flex center vcenter full'>
            <div className="modal formModal between">
                <div className="flex between">
                    <strong className="formModal" > Resumo de Pedido</strong>
                    <button className="btnFechar" onClick={props.HandleModal}>X</button>
                </div>
                <form className="formModal">
                    <label>Nome</label><input className="formInput"></input>
                    <label>Telefone</label><input className="formInput"></input>
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
            </div></div>)
}

export default Modal;