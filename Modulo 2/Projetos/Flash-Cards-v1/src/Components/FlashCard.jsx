import { getNewId } from '../Services/idService';

export default function FlashCard({
  titulo = 'Titulo',
  id = getNewId(),
  descricao = 'Descricao Flash Card',
  onToggleFlashCard = null,
  showFlashCardTitle = true,
}) {
  function HandlleShowTitle() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }

  let textSizeClass = showFlashCardTitle ? 'text-xl' : 'text-sm';
  return (
    <div
      className={`shadow-lg p-4 w-80 h-48 flex flex-row items-center justify-center font-mono ${textSizeClass} m-2`}
      onClick={HandlleShowTitle}
    >
      {showFlashCardTitle ? titulo : descricao}
    </div>
  );
}
