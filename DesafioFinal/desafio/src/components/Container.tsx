import React from 'react';
import styled from 'styled-components';
import { Menu } from './Menu';

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: blueviolet;
`;
const Container: React.FC = () => {
  return (
    <ContainerStyle>
      <Menu> React Desafio Final</Menu>
    </ContainerStyle>
  );
};
export default Container;
