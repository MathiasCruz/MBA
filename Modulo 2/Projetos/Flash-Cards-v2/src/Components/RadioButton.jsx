import { getNewId } from '../Services/idService';
import { useState } from 'react';
export default function RadioButton({
  id = getNewId(),
  name = 'radioButtonName',
  children: descricao,
  onChangeEvent = null,
  onChecked = false,
}) {
  function HandleChangeButton() {
    if (onChangeEvent) {
      onChangeEvent();
    }
  }
  const [showTitle, setShowTitle] = useState(true);
  return (
    <div className="flex flex-row items-center p-1">
      <input
        type="radio"
        id={id}
        name={name}
        checked={onChecked}
        onChange={HandleChangeButton}
      />
      <label htmlFor={id}>{descricao}</label>
    </div>
  );
}
