import React from 'react';
import styled from 'styled-components';
import { ITableProps } from '../interfaces/ITableProps';
import { Img } from './Img';

const Header: string[] = [
  'Classicação',
  'Time',
  'P',
  'V',
  'E',
  'D',
  'GP',
  'GC',
  'S',
];
const TableStyle = styled.table`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  margin-left: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
`;
const Td = styled.td`
  text-align: left;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
function Table(props: ITableProps) {
  const { Resultados } = props;
  var classificados = Resultados;
  return (
    <TableStyle>
      <thead>
        {Header.map(header => {
          return <Th key={header}>{header}</Th>;
        })}
      </thead>
      <tbody>
        {classificados.map((time, index) => {
          return (
            <tr key={time.time}>
              <Td>
                {index + 1}
                <div>
                  <Img src={'./img/' + time.img} />
                </div>
              </Td>
              <td>{time.time}</td>
              <td>{time.pontos}</td>
              <td>{time.vitorias}</td>
              <td>{time.empates}</td>
              <td>{time.derrotas}</td>
              <td>{time.golsPro}</td>
              <td>{time.golsContra}</td>
              <td>{time.saldoGols}</td>
            </tr>
          );
        })}
      </tbody>
    </TableStyle>
  );
}

export default Table;
