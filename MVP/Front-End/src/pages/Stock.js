import React, { useEffect, useState } from 'react';
import servico from '../service/httpService.js'
import NoProductsMessage from '../components/NoProductsMessage';
import ModalProducts from '../components/ModalProducts.js';

function Stock() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setModal] = useState(false);

  useEffect(() => {
    console.log("teste")
    servico.buscarTodosOsProdutos().then(produtos => {
      setData(produtos);
      setLoading(false)
    });
  }, [])

  function HandleModal() {
    console.log(!openModal)
    setModal(!openModal);
  }
  let main = <NoProductsMessage />;
  if (!loading) {
    if (data.length > 0) {
      main =
        <>
          <div className="tableContainer">
            <div><button onClick={HandleModal}>Cadastrar Produto</button></div>
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
            {!!openModal && <ModalProducts HandleModal={HandleModal} />}
          </div>
        </>
    }
  }
  return <>{main}</>
}

export default Stock;
