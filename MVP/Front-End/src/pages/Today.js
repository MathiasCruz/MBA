import React, { useState, useEffect } from 'react';
import servico from '../service/httpService'
import Card from '../components/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from '../components/Modal';
import NoProductsMessage from '../components/NoProductsMessage';

function Today() {
  const [cooking, setCooking] = useState([])

  useEffect(() => {
    servico.buscarTodosOsProdutos().then(produtos => {
      setCooking(produtos);
      setProducts(produtos);
      setLoading(false);
    });
  }, [])

  const [products, setProducts] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [openModal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);
  const actionList = { cooking: setCooking, reserved: setReserved, delivered: setDelivered }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(eval(list));
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    actionList[list](result);
  };

  const move = (listOld, listNew, indexOld, indexNew) => {
    let cpOld = Array.from(eval(listOld));
    let cpNew = Array.from(eval(listNew));

    let [removed] = cpOld.splice(indexOld, 1);
    cpNew.splice(indexNew, 0, removed);

    actionList[listOld](cpOld);
    if (listNew === "reserved") {
      cpNew[indexNew].reservedTime = new Date()
      cpNew[indexNew].qtdReservado = 1
      cpNew[indexNew].produtos = [cpNew[indexNew]]
      }
    if (listNew === "delivered") cpNew[indexNew].deliveredTime = new Date()
    actionList[listNew](cpNew);
  }

  const moveAndCombine = (listOld, listNew, indexOld, indexNew) => {
    let cpOld = Array.from(eval(listOld));
    let cpNew = Array.from(eval(listNew));

    let [removed] = cpOld.splice(indexOld, 1);

    actionList[listOld](cpOld);
    if (listNew === "reserved") {
      console.log(removed)
      cpNew = cpNew.map((item) => {
        if (item._id === indexNew) {
          return { ...item, produtos: [...item.produtos, { ...removed, qtdReservado: 1 }] }
        }
        else return item
      })
      if (listOld === listNew) {
        cpNew.splice(indexOld, 1);
      }
    }
    console.log(cpNew)
    actionList[listNew](cpNew);
  }

  function HandleModal(id) {
    setCurrentIndex(id);
    console.log(!openModal);
    setModal(!openModal);
  }
  const onDragEnd = result => {
    const { source, destination, combine } = result;
    console.log(source);
    console.log(result);
    if (combine) {
      moveAndCombine(source.droppableId, combine.droppableId, source.index, combine.draggableId)
    }
    if (!destination) return;
    if (source.droppableId === destination.droppableId) reorder(destination.droppableId, source.index, destination.index);
    else {
      move(source.droppableId, destination.droppableId, source.index, destination.index);
    }
  };
  let main = <NoProductsMessage />;
  if (!loading) {
    if (products.length > 0) {
      main =
        <>
          <div className="container"><DragDropContext onDragEnd={onDragEnd}>
            <div className="flex around container">
              <div className="col">
                <h3>Disponíveis</h3>
                <Droppable droppableId="cooking" isCombineEnabled>
                  {(provided) => (
                    <div ref={provided.innerRef} className="dragContainer">
                      {cooking.map((item, index) => <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided) => <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          <Card {...item} handleModal={HandleModal} />
                        </div>}
                      </Draggable>)}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="col">
                <h3>Reservado</h3>
                <Droppable droppableId="reserved" isCombineEnabled>
                  {(provided) => (
                    <div ref={provided.innerRef} className="dragContainer">
                      {reserved.map((item, index) => <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided) => <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          <Card {...item} handleModal={HandleModal} />
                        </div>}
                      </Draggable>)}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="col">
                <h3>Entregue</h3>
                <Droppable droppableId="delivered">
                  {(provided) => (
                    <div ref={provided.innerRef} className="dragContainer">
                      {delivered.map((item, index) => <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided) => <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          <Card {...item} handleModal={HandleModal} />
                        </div>}
                      </Draggable>)}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
            {!!openModal && <Modal id='Modal' item={reserved.find(item => item._id === currentIndex).produtos} HandleModal={HandleModal} />}
          </div>
        </>
    }
  }
  return main;
}

export default Today;
