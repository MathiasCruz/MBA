export default function TextArea({
  LabelDescription = 'Valor Default',
  textAreaValue = 'Nome',
  onTextAreaChange = null,
  maxLenght = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      let newName = currentTarget.value;
      onTextAreaChange(newName);
    }
  }
  const textAreaValueLenght = textAreaValue.length;
  return (
    <div className=" flex flex-col my-1 ">
      <label className="my-1" htmlFor="InputName">
        {LabelDescription}
      </label>
      <textarea
        value={textAreaValue}
        id="InputName"
        className="border p-1"
        onChange={handleTextAreaChange}
        rows={rows}
        maxLength={maxLenght}
      ></textarea>
      <div className="text-right">
        <span>
          {textAreaValueLenght} / {maxLenght}
        </span>
      </div>
    </div>
  );
}
