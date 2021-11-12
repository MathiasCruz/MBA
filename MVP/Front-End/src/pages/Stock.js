import React, { useState } from 'react';
import servico from '../service/httpService.js'

function Stock() {
  const [data] = useState(async () => {
    return await servico.buscarTodosOsProdutos();
  });

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
              <div className={"block " + item.nome.toLowerCase()} />
            </td>
            <td>{item.nome}</td>
            <td>
              <div className="flex vcenter center">
                <img className="icon" src={require("../img/minus.png")} alt="" />
                <span>{item.quantidade}</span>
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
