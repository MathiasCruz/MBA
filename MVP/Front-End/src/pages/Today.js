import React, {useState} from 'react';
import Card from '../components/Card';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function Today() {
	const [cooking, setCooking] = useState([{
		id: "1",
		time: new Date(),
		type: "Frango",
	}, {
		id: "2",
		time: new Date(),
		type: "Pernil",
	}, {
		id: "3",
		time: new Date(),
		type: "Picanha",
	}]);
	const [reserved, setReserved] = useState([]);
	const [delivered, setDelivered] = useState([]);

	const actionList = {cooking: setCooking, reserved: setReserved, delivered: setDelivered}

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
		if(listNew === "reserved") cpNew[indexNew].reservedTime = new Date()
		if(listNew === "delivered") cpNew[indexNew].deliveredTime = new Date()
		actionList[listNew](cpNew);
	}

	const onDragEnd = result => {
		const {source, destination} = result;
		if (!destination) return;

		if(source.droppableId === destination.droppableId) reorder(destination.droppableId, source.index, destination.index);
		else move(source.droppableId, destination.droppableId, source.index, destination.index)
	};

	return <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex around container">
      <div className="col">
        <h3>Disponíveis</h3>
        <Droppable droppableId="cooking">
          {(provided) => (
            <div ref={provided.innerRef} className="dragContainer">
              {cooking.map((item, index) => <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                  <Card {...item} />
                </div>}
              </Draggable>)}
            </div>
          )}
        </Droppable>
      </div>
      <div className="col">
        <h3>Reservado</h3>
        <Droppable droppableId="reserved">
          {(provided) => (
            <div ref={provided.innerRef} className="dragContainer">
              {reserved.map((item, index) => <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                  <Card {...item} />
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
              {delivered.map((item, index) => <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                  <Card {...item} />
                </div>}
              </Draggable>)}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  </DragDropContext>
}

export default Today;
