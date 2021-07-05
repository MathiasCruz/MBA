import React from 'react';
import styled from 'styled-components';
import InputSearch from '../atoms/InputSearch.compnent';

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
  return (
    <Container>
      <InputSearch found />
    </Container>
  );
};

export default CitySearch;
