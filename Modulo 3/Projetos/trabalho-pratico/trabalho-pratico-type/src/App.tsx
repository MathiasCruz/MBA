import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';
import { getFilteredBills } from './ApiBackend/ApiDespesasInfo';
import SelectMaterial from './Components/SelectMaterial';
import { IDespesas } from './Interfaces/IDespesas';
import DespesasPages from './Pages/DespesasPages';

function App() {
  const [bills, setBills] = useState<IDespesas[]>([]);
  const history = useHistory();

  useEffect(() => {
    history.push(`/despesas`);
  }, []);

  function changeSelectedDate(data: string) {
    if (data) {
      getFilteredBills(data).then(resp => setBills(resp));
      history.push(`/despesas/${data}`);
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      margin="20px"
      justifyItems="center"
    >
      <SelectMaterial onChangeSelect={changeSelectedDate} />
      <DespesasPages bills={bills} children="" />{' '}
    </Box>
  );
}

export default App;
