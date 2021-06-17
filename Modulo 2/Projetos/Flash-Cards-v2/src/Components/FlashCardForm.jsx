import TextArea from './TextArea';
import TextInput from './TextInput';
import { useEffect, useState } from 'react';
import Button from './Button';

export default function FlashCardForm({
  createMode = true,
  OnPersist = null,
  children: flashcard = null,
}) {
  let bgClass = createMode ? 'bg-green-200' : 'bg-yellow-400';
  const [description, setDescription] = useState(flashcard?.description);
  const [title, setTitle] = useState(flashcard?.title);
  useEffect(() => {
    if (createMode) {
      ClearFields();
    }
  }, [createMode]);

  function HandleTitle(newTitle) {
    setTitle(newTitle);
  }
  function HandleDescription(newDescription) {
    setDescription(newDescription);
  }

  function HandleSubmit(event) {
    event.preventDefault();
    if (ValidateFormInputs()) {
      if (OnPersist) {
        OnPersist(title, description);
      }
    }
  }

  function ValidateFormInputs() {
    return title.trim() !== '' && description.trim() !== '';
  }
  function HandleReset() {
    ClearFields();
  }

  function ClearFields() {
    setTitle('');
    setDescription('');
  }
  return (
    <form
      className={`${bgClass} p-4`}
      onSubmit={HandleSubmit}
      onReset={HandleReset}
    >
      <h2 className="text-center font-semibold">Cadastro Flash Card</h2>
      <TextInput
        LabelDescription="Titulo:"
        inputValue={title}
        onInputChange={HandleTitle}
      ></TextInput>
      <TextArea
        onTextAreaChange={HandleDescription}
        LabelDescription="Descrição"
        textAreaValue={description}
      ></TextArea>
      <div className="text-right ">
        <Button colorBg="bg-red-400" type="reset">
          Limpar
        </Button>
        <Button colorBg="bg-green-400" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}
