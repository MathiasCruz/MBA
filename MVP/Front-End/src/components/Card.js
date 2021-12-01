import React from 'react';

function Card({ reservedTime, deliveredTime, categoria = '', nome = '', handleModal,_id }) {
  const handleTime = time => { if (time) time.toLocaleTimeString().split(":").splice(0, 2).join(":"); }


  return <div className="card" onDoubleClick={() => { if (handleModal) handleModal(_id) }}>
    <div className={nome.toLowerCase() + ' line'}> </div>
    <div>
      <strong className="title">{nome}</strong>
      {!!reservedTime && <div className="flex vcenter" style={{ marginTop: 12 }}>
        <img alt="" src={require("../img/buy.svg")} className="timeImg" />
        <span>Reservado: {handleTime(reservedTime)}</span>
      </div>}
      {!!deliveredTime && <div className="flex vcenter" style={{ marginTop: 12 }}>
        <img alt="" src={require("../img/check.png")} className="timeImg" />
        <span>Entregue: {handleTime(deliveredTime)}</span>
      </div>}
    </div>
  </div>
}

export default Card;
