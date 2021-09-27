import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { meses } from '../Backend/Meses';
import { ISelectProps } from '../Interfaces/ISelectProps';

export default function SelectMaterial(props: ISelectProps) {
  const { ano, mes } = props;
  const historic = useHistory();
  function alteraAnoMes(ano: string, mes: string) {
    historic.push(`/despesas/${ano}-${mes}`);
  }
  return (
    <div>
      <Select
        value={ano}
        onChange={evt => alteraAnoMes(evt.target.value as string, mes)}
      >
        <MenuItem value="2020">2020</MenuItem>
        <MenuItem value="2021">2021</MenuItem>
      </Select>
      <Select
        value={mes}
        onChange={evt => alteraAnoMes(ano, evt.target.value as string)}
      >
        {meses.map(opcaoMes => (
          <MenuItem value={opcaoMes.valor}>{opcaoMes.nome}</MenuItem>
        ))}
      </Select>
    </div>
  );
}
