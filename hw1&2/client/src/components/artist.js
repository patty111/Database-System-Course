import React, { useEffect } from 'react';
import Axios from 'axios';

function Artist() {
  const [artist, setArtists] = React.useState([]);
  const [selectedArtist, setSelectedArtist] = React.useState(null);
  const [artistName, setArtistName] = React.useState('');
  const [artistBirthday, setArtistBirthday] = React.useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/artists')
      .then(response => {
        setArtists(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [artist]);

  const handleEditClick = (artist) => {
    setSelectedArtist(artist);
  };

  return (
    <div>
      <h1>Artists</h1>
      <button onClick={() => {
            Axios.post('http://localhost:3001/api/artists', {
              name: artistName,
              birthday: artistBirthday
            }).then(response => {
              setArtists([...artist, response.data]);
            });
          }}>Add Artist</button>

      <br></br>
      <input type="text" placeholder="Artist Name" id="updateInput" onChange={(event) => {
        setArtistName(event.target.value);
      }} />

      <br></br>

      <input type="text" placeholder="Birthday (YY:MM:DD HH:MM:SS)" id="updateInput" onChange={(event) => {
        setArtistBirthday(event.target.value);
      }} />


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {artist.map(artist => (
            <tr key={artist.artist_id}>
              <td>{artist.artist_id}</td>
              <td>{artist.name}</td>
              <td>{new Date(artist.birthday).toLocaleString('en-US', { timeZone: 'Asia/Taipei', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')}</td>
              <td>
                <button onClick={() => handleEditClick(artist)}>Edit</button>
              </td>
              <td>
                <button onClick={() => {
                  Axios.delete(`http://localhost:3001/api/artists/${artist.artist_id}`)
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedArtist && (
        <div>
          <h2>Edit Artist</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={selectedArtist.name} onChange={(event) => {
              setSelectedArtist({...selectedArtist, name: event.target.value});
            }} />
            <br></br>
            <label htmlFor="birthday">Birthday:</label>
            <input type="text" id="birthday" value={selectedArtist.birthday} onChange={(event) => {
              setSelectedArtist({...selectedArtist, birthday: event.target.value});
            }} />
            <br></br>

            <button type="submit" onClick={(event) => {
              event.preventDefault();
              Axios.put(`http://localhost:3001/api/artists/${selectedArtist.artist_id}`, {
                name: selectedArtist.name,
                birthday: selectedArtist.birthday
              }).then(response => {
                setArtists(artist.map(artist => {
                  if (artist.artist_id === selectedArtist.artist_id) {
                    return {...artist, name: selectedArtist.name, birthday: selectedArtist.birthday};
                  }
                  return artist;
                }));
                setSelectedArtist(null);
              });
            }}>Save</button>
            <button onClick={() => setSelectedArtist(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Artist;