export default function FlashCards({ children: flashCard }) {
  return (
    <div className="border flex flex-row justify-items-center flex-wrap">
      {' '}
      {flashCard}
    </div>
  );
}
