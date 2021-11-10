import React from 'react';

function Card({time, reservedTime, deliveredTime, type}) {
	const handleTime = time => time.toLocaleTimeString().split(":").splice(0, 2).join(":");

	return <div className="card">
    <div className={type.toLowerCase() + ' line'}> </div>
    <div>
      <strong className="title">{type}</strong>
      <div className="flex vcenter">
        <img alt="" src={require("../img/clock.svg")} className="timeImg" />
        <span>Início: {handleTime(time)}</span>
      </div>
      {!!reservedTime && <div className="flex vcenter" style={{marginTop: 12}}>
        <img alt="" src={require("../img/buy.svg")} className="timeImg" />
        <span>Reservado: {handleTime(reservedTime)}</span>
      </div>}
      {!!deliveredTime && <div className="flex vcenter" style={{marginTop: 12}}>
        <img alt="" src={require("../img/check.png")} className="timeImg" />
        <span>Entregue: {handleTime(deliveredTime)}</span>
      </div>}
    </div>
  </div>
}

export default Card;
