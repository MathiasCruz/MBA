import { useEffect, useState } from 'react';
import Button from '../Components/Button';
import FlashCard from '../Components/FlashCard';
import FlashCards from '../Components/FlashCards';
import Header from '../Components/Header';
import Main from '../Components/Main';
import RadioButton from '../Components/RadioButton';
import {
  apiGetAllFlashCards,
  apiCreateFlashCard,
} from '../Services/apiService';
import { apiRemoveFlashCard } from '../Services/apiService';
import { helperShuffleArray } from '../Helpers/arrayHelpers';
import Loading from '../Components/Loading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FlashCardItem from '../Components/FlashCardItem';
import FlashCardForm from '../Components/FlashCardForm';
import { NIL } from 'uuid';
import { getNewId } from '../Services/idService';

export default function FlashCardPages() {
  const [AllCards, setAllCards] = useState([]);
  const [StudyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [loadingEfc, setloadingEfc] = useState(true);
  const [editMode, setEditMode] = useState(true);
  const [seletedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSeletedFlashCard] = useState(null);

  useEffect(() => {
    apiGetAllFlashCards().then(allFlashCards => {
      setAllCards(allFlashCards);
      setloadingEfc(false);
    });
  }, []);

  useEffect(() => {
    setStudyCards(AllCards.map(card => ({ ...card, showTitle: true })));
  }, [AllCards]);

  function HandlleButton() {
    const shuffleArray = helperShuffleArray(StudyCards);
    setStudyCards(shuffleArray);
  }

  function HandleShowTitle() {
    const updatedCard = [...StudyCards].map(card => ({
      ...card,
      showTitle: true,
    }));

    setStudyCards(updatedCard);
    setRadioButtonShowTitle(true);
  }
  function HandleShowDescription() {
    const updatedCard = [...StudyCards].map(card => ({
      ...card,
      showTitle: false,
    }));

    setStudyCards(updatedCard);
    setRadioButtonShowTitle(false);
  }

  function HandleToogleFlashCard(cardId) {
    const updatedCard = [...StudyCards];
    const index = updatedCard.findIndex(card => card.id === cardId);
    updatedCard[index].showTitle = !updatedCard[index].showTitle;
    setStudyCards(updatedCard);
  }

  async function HandleDelete(id) {
    await apiRemoveFlashCard(id);
    setAllCards(AllCards.filter(card => card.id !== id));
  }

  function HandleEditMode(card) {
    setEditMode(false);
    setSelectedTab(1);
    setSeletedFlashCard(card);
  }
  function HandleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }
  function HandleNewFlashCard() {
    setEditMode(true);
    setSeletedFlashCard(null);
  }
  async function HandlePersist(title, description) {
    if (editMode) {
      const newCard = await apiCreateFlashCard(title, description);

      setAllCards([...AllCards, { newCard }]);
    } else {
      console.log(title);
      setAllCards(
        AllCards.map(card => {
          if (card.id === selectedFlashCard.id) {
            return { ...card, title, description };
          }
          return card;
        })
      );
      setSeletedFlashCard(null);
      setEditMode(true);
    }
  }

  let mainJsx = (
    <div className="flex justify-center">
      <Loading />
    </div>
  );

  if (!loadingEfc) {
    mainJsx = (
      <>
        <Tabs selectedIndex={seletedTab} onSelect={HandleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {AllCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={HandleDelete}
                  onEdit={HandleEditMode}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <Button onClickButton={HandleNewFlashCard}>Novo Flash Card</Button>
            <FlashCardForm createMode={editMode} OnPersist={HandlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>
          <TabPanel>
            {' '}
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
              {StudyCards.map(({ id, title, description, showTitle }) => {
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
          </TabPanel>
        </Tabs>
      </>
    );
  }
  return (
    <>
      <Header>Projeto Flash cards</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
