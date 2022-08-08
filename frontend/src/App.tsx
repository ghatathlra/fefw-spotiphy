import {FC, useCallback, useState} from 'react';
import {Route, Switch} from 'react-router-dom';

import {APP_ROUTES} from './App.routes';
import {AuthenticationContext} from './contexts';
import {LoginResponse} from './services/apis';
import {StorageKeys} from './services/constants';

const App: FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem(StorageKeys.userinfo));

  const setLoggedIn = useCallback((userinfo: LoginResponse) => {
    localStorage.setItem(StorageKeys.userinfo, JSON.stringify(userinfo));
    setIsLoggedIn(true);
  }, []);

  const setLoggedOut = useCallback(() => {
    localStorage.removeItem(StorageKeys.userinfo);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthenticationContext.Provider value={{isLoggedIn, setLoggedIn, setLoggedOut}}>
      <Switch>
        {APP_ROUTES.map((route) => (
          <Route key={route.path} exact={route.exact} path={route.path} render={route.render} />
        ))}
      </Switch>
    </AuthenticationContext.Provider>
  );
};

export default App;
