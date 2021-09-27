import { useState } from 'react';

const InputNumerico = ({ initialValue, min = 1, max = 9, corect = 0 }) => {
  const [value, setValue] = useState(initialValue);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="numericInput">Numero</label>
      <input
        id="numericInput"
        type="text"
        value={value}
        onChange={handleChange}
      ></input>
      {value < min || value > max ? <span>Erro</span> : null}
      {showCorrect ? <span>Numero Correto</span> : null}
    </div>
  );
};

export default InputNumerico;
