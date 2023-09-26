import React, { useEffect } from 'react';
import Axios from 'axios';

function Genre() {
  const [genres, setGenres] = React.useState([]);
  const [selectedGenre, setSelectedGenre] = React.useState(null);
  const [genreName, setGenreName] = React.useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/genres')
      .then(response => {
        setGenres(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [genres]);

  const handleEditClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <h1>Genres</h1>
      <button onClick={() => {
            Axios.post('http://localhost:3001/api/genres', {
              name: genreName
            }).then(response => {
              setGenres([...genres, response.data]);
            });
          }}>Add Genre</button>

      <input type="text" placeholder="Genre Name" id="updateInput" onChange={(event) => {
        setGenreName(event.target.value);
      }} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {genres.map(genre => (
            <tr key={genre.genre_id}>
              <td>{genre.genre_id}</td>
              <td>{genre.name}</td>
              <td>
                <button onClick={() => handleEditClick(genre)}>Edit</button>
              </td>
              <td>
                <button onClick={() => {
                  Axios.delete(`http://localhost:3001/api/genres/${genre.genre_id}`)
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedGenre && (
        <div>
          <h2>Edit Genre</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={selectedGenre.name} onChange={(event) => {
              setSelectedGenre({...selectedGenre, name: event.target.value});
            }} />
            <button type="submit" onClick={(event) => {
              event.preventDefault();
              Axios.put(`http://localhost:3001/api/genres/${selectedGenre.genre_id}`, {
                name: selectedGenre.name
              }).then(response => {
                setGenres(genres.map(genre => {
                  if (genre.genre_id === selectedGenre.genre_id) {
                    return {...genre, name: selectedGenre.name};
                  }
                  return genre;
                }));
                setSelectedGenre(null);
              });
            }}>Save</button>
            <button onClick={() => setSelectedGenre(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Genre;