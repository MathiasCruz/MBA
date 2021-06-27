import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { MONTHS_OF_YEAR } from '../Helpers/dateHelpers';
import React, { useState } from 'react';
import { ISelectProperties } from '../Interfaces/ISelectProperties';
import { getNewUrl } from '../ApiBackend/ApiDespesasInfo';

export default function SelectMaterial(props: ISelectProperties) {
  const [itemSelected, setItemSelected] = useState<number>(0);

  function handleClick(evt: unknown) {
    let month = parseInt(evt as string);
    month = month + 1;
    const url = getNewUrl('2021', month.toString());
    const newDate = '2021-' + month.toString().padStart(2, '0');
    console.log(url);
    props.onChangeSelect(newDate);
    setItemSelected(evt as number);
  }

  return (
    <Box>
      <FormControl>
        <Select value="2021">
          <MenuItem id="ano" value="2021">
            2021{' '}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Select
          value={itemSelected}
          onChange={evt => {
            handleClick(evt.target.value);
          }}
        >
          {MONTHS_OF_YEAR.map((mes, index) => {
            return (
              <MenuItem key={index} value={index}>
                {mes}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
