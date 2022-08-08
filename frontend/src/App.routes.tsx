import {Redirect} from 'react-router-dom';

import {Routes} from './services/constants';
import {AuthenticatedGuard, UnauthenticatedGuard} from './components';
import {Login, Search} from './pages';

const APP_ROUTES = [
  {
    exact: false,
    path: Routes.login,
    render: () => <UnauthenticatedGuard elseRedirectTo={Routes.root}><Login /></UnauthenticatedGuard>,
  }, {
    exact: false,
    path: Routes.search,
    render: () => <AuthenticatedGuard elseRedirectTo={Routes.login}><Search /></AuthenticatedGuard>,
  }, {
    exact: true,
    path: Routes.root,
    render: () => <Redirect to={Routes.search} />,
  },
];

export {APP_ROUTES};