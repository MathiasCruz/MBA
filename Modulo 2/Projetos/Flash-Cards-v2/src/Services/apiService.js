import { getAll, removeItem, CreateItem } from './httpService';
import { getNewId } from './idService';

export async function apiGetAllFlashCards() {
  const allFlashCards = await getAll('/flashcards');
  return allFlashCards;
}
export async function apiRemoveFlashCard(cardId) {
  await removeItem(`/flashcards/${cardId}`);
}
export async function apiCreateFlashCard(title, description) {
  const newItem = await CreateItem('/flashcards/', {
    id: getNewId(),
    title,
    description,
  });
  return newItem;
}
