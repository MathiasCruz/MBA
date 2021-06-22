import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { MONTHS_OF_YEAR } from '../Helpers/dateHelpers';

export default function SelectMaterial() {
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
        <Select value={MONTHS_OF_YEAR[0]}>
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
