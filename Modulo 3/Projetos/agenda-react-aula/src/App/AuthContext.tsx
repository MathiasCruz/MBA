import React from 'react';
import { IAuthContext } from '../Backend/backend';

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: 'Anonimo',
    email: '',
  },
  OnSignOut: () => {},
});
