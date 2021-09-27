export default function DateInput({
  LabelDescription = 'Data',
  inputValue = '2021-06-05',
  onInputChange = null,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      let newDate = currentTarget.value;
      onInputChange(newDate);
    }
  }
  return (
    <div className=" flex flex-col my-1 ">
      <label className="my-1" htmlFor="InputDate">
        {LabelDescription}
      </label>
      <input
        value={inputValue}
        id="InputDate"
        type="date"
        className="border p-1"
        onChange={handleInputChange}
      ></input>
    </div>
  );
}
