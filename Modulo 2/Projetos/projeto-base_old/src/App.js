import Main from './components/Main';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import TextInput from './components/TextInput';
import DateInput from './components/DateInput';
import { getAgeFrom } from './helpers/dateHelpers';
import CheckBoxInput from './components/CheckBoxInput';
import Timer from './components/Timer';
import { StatusCheckApp } from './components/OnlineOffline';

export default function App() {
  const [Name, setName] = useState('Mathias');
  const [BirthDate, setBirthDate] = useState('1995-08-15');
  const [ShowTimer, setShowTimer] = useState(false);
  const [IsOnline, setIsOnline] = useState(true);

  function HandleChangeName(newName) {
    setName(newName);
  }
  function HandleDateName(newDate) {
    setBirthDate(newDate);
  }
  function HandleShowCheckbox(toggle) {
    setShowTimer(toggle => !toggle);
  }
  useEffect(() => {
    document.title = Name;
  }, [Name]);

  useEffect(() => {
    function toogleOnline() {
      setIsOnline(true);
    }
    function toogleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', toogleOnline);
    window.addEventListener('offline', toogleOffline);
  }, []);

  return (
    <>
      <Header> Hello World em React</Header>
      <Main>
        <StatusCheckApp appStatus={IsOnline} />
        {ShowTimer && (
          <div className="text-right">
            <Timer />
          </div>
        )}
        <CheckBoxInput
          LabelDescription="Setar Timer"
          inputValue={ShowTimer}
          onInputChange={HandleShowCheckbox}
        ></CheckBoxInput>
        <TextInput
          LabelDescription="Digite Seu Nome :"
          inputValue={Name}
          onInputChange={HandleChangeName}
        />
        <DateInput
          LabelDescription="Digite sua Data de Nascimento :"
          inputValue={BirthDate}
          onInputChange={HandleDateName}
        />
        <p>
          O seu nome é {Name} você tem {getAgeFrom(BirthDate)} anos
        </p>
      </Main>
    </>
  );
}
