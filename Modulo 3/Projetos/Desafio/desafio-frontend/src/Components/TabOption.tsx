import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { IDespesasFiltrado } from '../Interfaces/ISimpleTabsProps';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: '40px',
  },
  table: {
    width: '100%',
  },
}));

export default function SimpleTabs(props: IDespesasFiltrado) {
  const { despesasMes, categoriaEValor, valorTotal } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div>Valor Total: {valorTotal?.toFixed(2)}</div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Resumo" {...a11yProps(0)} />
          <Tab label="Detalhes" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}></TabPanel>
      <TableContainer component="div">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriaEValor.map((categoria, i) => (
              <TableRow key={i}>
                <TableCell>{categoria.categoria}</TableCell>
                <TableCell>{categoria.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TabPanel value={value} index={1}>
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
              {despesasMes.map((despesasMes, i) => (
                <TableRow key={i}>
                  <TableCell>{despesasMes.descricao}</TableCell>
                  <TableCell>{despesasMes.categoria}</TableCell>
                  <TableCell align="right">{despesasMes.dia}</TableCell>
                  <TableCell align="right">{despesasMes.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
}
