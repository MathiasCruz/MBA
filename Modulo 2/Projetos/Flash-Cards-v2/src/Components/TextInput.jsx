export default function TextInput({
  LabelDescription = 'Valor Default',
  inputValue = 'Nome',
  onInputChange = null,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      let newName = currentTarget.value;
      onInputChange(newName);
    }
  }
  return (
    <div className=" flex flex-col my-1 ">
      <label className="my-1" htmlFor="InputName">
        {LabelDescription}
      </label>
      <input
        value={inputValue}
        id="InputName"
        type="text"
        className="border p-1"
        onChange={handleInputChange}
      ></input>
    </div>
  );
}
