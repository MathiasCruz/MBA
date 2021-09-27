import { useState } from 'react';
import Countries from '../components/Countries';
import Header from '../components/Header';
import Main from '../components/Main';
import TextInput from '../components/TextInput';
import { AllCountries } from '../Data/countries';

export default function ReactCountriesPage() {
  const [Country, setCountry] = useState('Brazil');
  function HandleCountryChange(newCountryFilter) {
    setCountry(newCountryFilter);
  }
  const filterCountryLowerCase = Country.trim().toLocaleLowerCase();
  const filteredCountries =
    filterCountryLowerCase.trim().length >= 3
      ? AllCountries.filter(({ nameLowerCase }) => {
          return nameLowerCase.includes(filterCountryLowerCase);
        })
      : AllCountries;

  return (
    <>
      <Header>React Countries</Header>
      <Main>
        <TextInput
          LabelDescription="Digite o nome do Pais (3 letras no minimo)"
          inputValue={Country}
          onInputChange={HandleCountryChange}
        ></TextInput>
        <Countries>{filteredCountries}</Countries>
      </Main>
    </>
  );
}
