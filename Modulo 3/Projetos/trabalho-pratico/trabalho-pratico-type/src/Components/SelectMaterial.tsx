import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { MONTHS_OF_YEAR } from '../Helpers/dateHelpers';
import { useHistory } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { ISelectProperties } from '../Interfaces/ISelectProperties';
import { getNewUrl } from '../ApiBackend/ApiDespesasInfo';

export default function SelectMaterial(props: ISelectProperties) {
  return SwitchMonth();

  function SwitchMonth() {
    let history = useHistory();

    function handleClick(evt: unknown) {
      let month = parseInt(evt as string);
      month = month + 1;
      const url = getNewUrl('2021', month.toString());
      const newDate = '2021-' + month.toString().padStart(2, '0');
      console.log(url);
      props.onChangeSelect(newDate);
    }

    return (
      <Box display="flex" flexDirection="row">
        <FormControl>
          <Select value="2021">
            <MenuItem id="ano" value="2021">
              2021{' '}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={0}
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
}
