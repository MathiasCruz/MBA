import React, {useState} from 'react';

function Stock() {
  const [data] = useState([{
    type: 'Frango',
    quantity: '47',
  }, {
    type: 'Refrigerante',
    quantity: 12,
  }, {
    type: 'Torta',
    quantity: 2
  }, {
    type: 'Pernil',
    quantity: 29
  }, {
    type: 'Picanha',
    quantity: 31
  }])

	return <div className="tableContainer">
    <table className="table">
      <thead>
        <tr>
          <th>Cor</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return <tr key={index}>
            <td>
              <div className={"block " + item.type.toLowerCase()} />
            </td>
            <td>{item.type}</td>
            <td>
              <div className="flex vcenter center">
                <img className="icon" src={require("../img/minus.png")} alt="" />
                <span>{item.quantity}</span>
                <img className="icon" src={require("../img/add.png")} alt="" />
              </div>
            </td>
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
