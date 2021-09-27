export default function CheckBoxInput({
  LabelDescription = 'Checkbox',
  inputValue,
  onInputChange = null,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      let newValueCheck = currentTarget.value;
      onInputChange(newValueCheck);
    }
  }
  return (
    <div className="bg-blue-100 flex flex-row items-center space-x-2  my-4 ">
      <input
        value={inputValue}
        id="InputCheck"
        type="checkbox"
        className="border p-1"
        onChange={handleInputChange}
      ></input>
      <label className="my-1" htmlFor="InputCheck">
        {LabelDescription}
      </label>
    </div>
  );
}
