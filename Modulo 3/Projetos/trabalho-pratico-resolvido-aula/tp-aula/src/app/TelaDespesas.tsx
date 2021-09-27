import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { buscaDespesas } from './backend';
import { IDespesa } from "./tipos";
import Box from "@material-ui/core/Box";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useParams, useHistory} from "react-router-dom";


const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

type Params = { mes: string };

const meses = [
  { valor: "01", nome: "Janeiro" },
  { valor: "02", nome: "Fevereiro" },
  { valor: "03", nome: "Março" },
  { valor: "04", nome: "Abril" },
  { valor: "05", nome: "Maio" },
  { valor: "06", nome: "Junho" },
  { valor: "07", nome: "Julho" },
  { valor: "08", nome: "Agosto" },
  { valor: "09", nome: "Setembro" },
  { valor: "10", nome: "Outubro" },
  { valor: "11", nome: "Novembro" },
  { valor: "12", nome: "Dezembro" },
];

function TelaDespesas() {
  const classes = useStyles();
  const {mes: mesIso} = useParams<Params>();
  const [ano, mes] = mesIso.split("-");
  const history = useHistory();

  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  
  useEffect(() => {
    buscaDespesas(mesIso).then(setDespesas);
  }, [mesIso]);

  // let total = 0;
  // for (const despesa of despesas) {
  //   total += despesa.valor;
  // }
  const total = despesas.reduce((soma, item) => soma + item.valor, 0);

  function alteraAnoMes(ano: string, mes: string) {
    history.push(`/despesas/${ano}-${mes}`);
  }

  return (
    <div>
      <Box display="flex" padding="16px">
        <Select value={ano} onChange={(evt) => alteraAnoMes(evt.target.value as string, mes) }>
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
        </Select>
        <Select value={mes} onChange={(evt) => alteraAnoMes(ano, evt.target.value as string) }>
          {meses.map(opcaoMes => (
            <MenuItem value={opcaoMes.valor}>{opcaoMes.nome}</MenuItem>
          ))}
        </Select>
        <Box/>
        Total R$ {formataValor(total)}
      </Box>
    <TableContainer component="div">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Despesa</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Dia</TableCell>
            <TableCell align="right">Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map((despesa, i) => (
            <TableRow key={i}>
              <TableCell>{despesa.descricao}</TableCell>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell align="right">{despesa.dia}</TableCell>
              <TableCell align="right">{formataValor(despesa.valor)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

function formataValor(valor: number) {
  return valor.toFixed(2);
}

export default TelaDespesas;
