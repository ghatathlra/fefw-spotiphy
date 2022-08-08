import {FC, ReactNode, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import {AuthenticationContext} from '../../contexts';

type Props = {
  elseRedirectTo: string;
  children: ReactNode;
};

const AuthenticatedGuard: FC<Props> = (props) => {
  const {isLoggedIn} = useContext(AuthenticationContext);

  return (
    isLoggedIn
      ? <>{props.children}</>
      : <Redirect to={props.elseRedirectTo || '/'} />
  );
};

export default AuthenticatedGuard;