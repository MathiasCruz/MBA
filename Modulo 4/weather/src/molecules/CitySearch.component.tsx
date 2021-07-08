import { useAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import InputSearch from '../atoms/InputSearch.compnent';
import { citiesAtom } from '../global';
import useSearch from '../lib/UseSearch';

const Container = styled.div`
  display: flex;
  flex-diretion: column;
  justify-content: space-aroud;
  flex-basis: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  padding-top: 5rem;
`;

const CitySearch = () => {
  const { cities } = useAtom(citiesAtom);
  return (
    <Container>
      <InputSearch found />
      <div>{}</div>
    </Container>
  );
};

export default CitySearch;
