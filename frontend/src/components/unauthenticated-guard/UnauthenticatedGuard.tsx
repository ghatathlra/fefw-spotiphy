import {FC, ReactNode, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import {AuthenticationContext} from '../../contexts';

type Props = {
  elseRedirectTo: string;
  children: ReactNode;
};

const UnauthenticatedGuard: FC<Props> = (props) => {
  const {isLoggedIn} = useContext(AuthenticationContext);
  const isLoggedOut = !isLoggedIn;

  return (
    isLoggedOut
      ? <>{props.children}</>
      : <Redirect to={props.elseRedirectTo || '/'} />
  );
};

export default UnauthenticatedGuard;