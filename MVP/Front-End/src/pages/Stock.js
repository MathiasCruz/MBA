import React, { useEffect, useState } from 'react';
import servico from '../service/httpService.js'
import NoProductsMessage from '../components/NoProductsMessage';

function Stock() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log("teste")
    servico.buscarTodosOsProdutos().then(produtos => {
      setData(produtos);
      setLoading(false)
    });
  }, [])

  let main = <NoProductsMessage />;
  if (!loading) {
    if (data.length > 0) {
      main =
        <>
          <div className="tableContainer">
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return <tr key={item._id}>
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
        </>
    }
  }
  return <>{main}</>
}

export default Stock;
