import Menu from '@material-ui/core/Menu';

import {
  Avatar,
  Box,
  Icon,
  IconButton,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import { useContext, useState } from 'react';
import { SignOut } from '../Backend/backend';
import { authContext } from './AuthContext';
const useStyles = makeStyles({
  userDetails: {
    borderBottom: '1px solid rgb(224,224,224)',
    padding: '16px',
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginBottom: '8px',
    },
  },
});

export default function UserMenu() {
  const { user, OnSignOut } = useContext(authContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function SignOutLogin() {
    SignOut();
    OnSignOut();
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.userDetails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={SignOutLogin}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
