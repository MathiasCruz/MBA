import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  GetAllBillsApi,
  getFilteredBills,
} from '../ApiBackend/ApiDespesasInfo';
import SelectMaterial from '../Components/SelectMaterial';
import { GetActualYearMonth } from '../Helpers/dateHelpers';
import { IDespesas } from '../Interfaces/IDespesas';

export default function DespesasPages() {
  const CABECALHO = ['Despesas', 'Categoria', 'Dia', 'Valor'];
  const [allBills, setAllBills] = useState<IDespesas[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(
    GetActualYearMonth()
  );
  const [bills, setBills] = useState<IDespesas[]>([]);

  function GetAllBills() {
    GetAllBillsApi().then(resp => {
      setAllBills(resp);
    });
  }
  function ReturnTotalBills() {
    let valorTotal = bills.reduce((total, numero) => total + numero.valor, 0);
    console.log(valorTotal);
    // setTotal(totalValue);
    return valorTotal.toLocaleString();
  }

  useEffect(() => {
    getFilteredBills(selectedDate).then(resp => setBills(resp));
    console.log(bills);
  }, [selectedDate]);

  function changeSelectedDate(newDate: string) {
    console.log(newDate);
    setSelectedDate(newDate);
  }
  return (
    <>
      {bills && (
        <div>
          <div>{ReturnTotalBills()}</div>
          <SelectMaterial onChangeSelect={changeSelectedDate} />
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
              {bills.map(bill => {
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
