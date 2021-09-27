import React from 'react';
import {
  AiTwotoneEdit as EditIcon,
  AiTwotoneDelete as DeleteIcon,
} from 'react-icons/ai';

export default function FlashCardItem({
  children: flashCard,
  onEdit = null,
  onDelete = null,
}) {
  const { title, description } = flashCard;

  function HandleOnDelete() {
    if (onDelete) {
      onDelete(flashCard.id);
    }
  }
  function HandleOnEdit() {
    if (onEdit) {
      onEdit(flashCard);
    }
  }
  return (
    <div className="border p-2 m-2">
      <ul className="flex flex-col space-y-2">
        <li>
          <strong>Titulo: </strong>
          {title}
        </li>
        <li>
          {' '}
          <strong>Descrição: </strong>
          {description}
        </li>
      </ul>
      <div className="mt-4 flex flex-row items-center justify-end space-x-4">
        <EditIcon size={24} className="cursor-pointer" onClick={HandleOnEdit} />
        <DeleteIcon
          size={24}
          className="cursor-pointer"
          onClick={HandleOnDelete}
        />
      </div>
    </div>
  );
}
