export default function Button({
  children: description,
  onClickButton = null,
}) {
  function handlleClick() {
    if (onClickButton) {
      onClickButton();
    }
  }
  return (
    <button className="bg-gray-200 p-2 rounded-b-md m-2" onClick={handlleClick}>
      {description}
    </button>
  );
}
