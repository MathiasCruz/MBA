import { useState } from 'react';
import Button from '../Components/Button';
import FlashCard from '../Components/FlashCard';
import FlashCards from '../Components/FlashCards';
import Header from '../Components/Header';
import Main from '../Components/Main';
import RadioButton from '../Components/RadioButton';
import { allFlashCards } from '../Data/AllFlashcards';
import { helperShuffleArray } from '../Helpers/arrayHelpers';

export default function FlashCardPages() {
  const [AllCards, setAllCards] = useState(allFlashCards);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  function HandlleButton() {
    const shuffleArray = helperShuffleArray(allFlashCards);
    setAllCards(shuffleArray);
  }

  function HandleShowTitle() {
    const updatedCard = [...AllCards].map(card => ({
      ...card,
      showTitle: true,
    }));

    setAllCards(updatedCard);
    setRadioButtonShowTitle(true);
  }
  function HandleShowDescription() {
    const updatedCard = [...AllCards].map(card => ({
      ...card,
      showTitle: false,
    }));

    setAllCards(updatedCard);
    setRadioButtonShowTitle(false);
  }

  function HandleToogleFlashCard(cardId) {
    const updatedCard = [...AllCards];
    const index = updatedCard.findIndex(card => card.id === cardId);
    updatedCard[index].showTitle = !updatedCard[index].showTitle;
    setAllCards(updatedCard);
  }
  return (
    <>
      <Header>Projeto Flash cards</Header>
      <Main>
        <div className="text-center">
          {' '}
          <Button onClickButton={HandlleButton}>Embaralhar Cards </Button>
        </div>
        <div className="flex flex-row items-center m-4 space-x-4 justify-center">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            onChangeEvent={HandleShowTitle}
            onChecked={radioButtonShowTitle}
          ></RadioButton>
          Mostrar Titulo
          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            onChangeEvent={HandleShowDescription}
            onChecked={!radioButtonShowTitle}
          ></RadioButton>
          Mostrar Descricao
        </div>
        <FlashCards>
          {AllCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                titulo={title}
                descricao={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={HandleToogleFlashCard}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
