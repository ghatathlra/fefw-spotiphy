import {FC, useContext, useState, useCallback} from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import {AuthenticationContext} from '../../contexts';
import {Artist, callLogout, callSearchApi, Track} from '../../services/apis';

const Search: FC<{}> = () => {
  const {setLoggedOut} = useContext(AuthenticationContext);

  const handleLogOut = useCallback(() => {
    callLogout().then(setLoggedOut);
  }, [setLoggedOut]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      callSearchApi({q: searchQuery})
        .then((data) => {
          setArtists(data.artists);
          setTracks(data.tracks);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [searchQuery],
  );

  return (
    <>
      <Button onClick={handleLogOut}>Log out</Button>
      <Container>
        <h1 className="text-center mb-4">Search</h1>

        <Form onSubmit={handleSearch} className="mb-4">
          <InputGroup>
            <FormControl
              placeholder="Search for songs, artists"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target?.value || '');
              }}
            />
            <InputGroup.Append>
              <Button type="submit" variant="primary">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>

        {/* <h3>Artists</h3> */}
        {/* Render artists here */}

        <h3>Tracks</h3>
        <div>
          {tracks.map((track) => (
            <div key={track.id} className="d-flex align-items-center justify-content-between mb-3 p-3 border rounded">
              <div>
                <div className="font-weight-bold">{track.name}</div>
                <div className="small text-secondary">{track.artist}</div>
              </div>
              {track.previewUrl ? (
                <div className="player">
                  <audio controls>
                    <source src={track.previewUrl} type="audio/ogg" />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Search;
