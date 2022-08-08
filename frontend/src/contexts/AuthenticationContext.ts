import React from 'react';
import {LoginResponse} from '../services/apis';

export type AuthenticationContextValue = {
  isLoggedIn: boolean;
  setLoggedIn: (userinfo: LoginResponse) => void;
  setLoggedOut: () => void;
};

const AuthenticationContext = React.createContext<AuthenticationContextValue>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  setLoggedOut: () => {},
});

export {AuthenticationContext};
