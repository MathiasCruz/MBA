import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { IDespesasPagesParams } from '../Interfaces/IDespesas';

export default function DespesasPages(props: IDespesasPagesParams) {
  const CABECALHO = ['Despesas', 'Categoria', 'Dia', 'Valor'];
  function ReturnTotalBills() {
    let valorTotal = props.bills.reduce(
      (total, numero) => total + numero.valor,
      0
    );
    console.log(valorTotal);
    return valorTotal.toLocaleString();
  }
  return (
    <>
      {props.bills && (
        <div>
          <div>{ReturnTotalBills()}</div>

          <TableContainer>
            <TableHead>
              {' '}
              <TableRow>
                {CABECALHO.map((valorCabecalho, index) => {
                  return <TableCell key={index}>{valorCabecalho}</TableCell>;
                })}
              </TableRow>{' '}
            </TableHead>
            <TableBody>
              {props.bills.map(bill => {
                return (
                  <TableRow key={bill.id}>
                    <TableCell>{bill.descricao}</TableCell>
                    <TableCell>{bill.categoria}</TableCell>
                    <TableCell>{bill.dia}</TableCell>
                    <TableCell>{bill.valor}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </div>
      )}
    </>
  );
}
