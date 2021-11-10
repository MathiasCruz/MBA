import React, {useState} from 'react';

function Stock() {
  const [data] = useState([{
    name: 'José',
    validUntil: '2021-08-30T00:00:00',
  }, {
    name: 'Maria',
    validUntil: '2021-09-30T00:00:00',
  }, {
    name: 'Fábio',
    validUntil: '2021-09-10T00:00:00',
  }, {
    name: 'Maicon',
    validUntil: '2021-09-17T00:00:00',
  }, {
    name: 'Juliana',
    validUntil: '2021-09-04T00:00:00',
  }])

	return <div className="tableContainer">
    <table className="table">
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Valido até</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return <tr key={index}>
            <td>{item.name}</td>
            <td>{new Date(item.validUntil).toLocaleString()}</td>
            <td>
              <img className="icon" src={require("../img/pencil.png")} alt="" />
              <img className="icon" src={require("../img/trash.png")} alt="" />
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

export default Stock;
