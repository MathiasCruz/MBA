import Box from '@material-ui/core/Box';
import { Icon, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AddMonth, monthFormatterString } from './dateFunctions';
import { ICalendarheaderPros } from '../Backend/backend';
import UserMenu from './UserMenu';
import React from 'react';

export const CalendarsHeader = React.memo(function (
  props: ICalendarheaderPros
) {
  const { month } = props;
  return (
    <Box display="flex" alignItems="center" padding="8px 16px">
      <IconButton component={Link} to={'/calendar/' + AddMonth(month, -1)}>
        <Icon>chevron_left</Icon>
      </IconButton>
      <IconButton component={Link} to={'/calendar/' + AddMonth(month, 1)}>
        <Icon>chevron_right</Icon>
      </IconButton>
      <Box flex="1" margin-left="16px" component="h3">
        {monthFormatterString(month)} de 2021
      </Box>
      <UserMenu />
    </Box>
  );
});
