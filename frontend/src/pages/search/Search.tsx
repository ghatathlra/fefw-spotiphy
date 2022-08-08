import {FC, useContext} from 'react';

import Button from 'react-bootstrap/Button';

import {AuthenticationContext} from '../../contexts';

const Search: FC<{}> = () => {
  const {setLoggedOut} = useContext(AuthenticationContext);

  return <Button onClick={() => {setLoggedOut()}}>Log out</Button>;
};

export default Search;