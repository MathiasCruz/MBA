export default function Button({
  children: description,
  onClickButton = null,
  type = 'button',
  colorBg = 'bg-gray-200 ',
}) {
  function handlleClick() {
    if (onClickButton) {
      onClickButton();
    }
  }
  return (
    <button
      className={`p-2 rounded-b-md m-2 ${colorBg}`}
      onClick={handlleClick}
      type={type}
    >
      {description}
    </button>
  );
}
