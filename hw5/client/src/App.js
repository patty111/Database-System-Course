import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [artists, setArtists] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    (async () => await loadArtists())();
  }, []);

  async function loadArtists() {
    const result = await axios.get(`${process.env.REACT_APP_API_SERVER}/artist`);
    setArtists(result.data);
  }

  async function saveArtist(event) {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_SERVER}/artist`, {
        name: name,
        birthday: birthday,
      });
      alert("Artist registered successfully");
      setName("");
      setBirthday("");
      await loadArtists();
    } catch (err) {
      alert("Failed to register artist");
    }
  }

  async function editArtist(artist) {
    setName(artist.name);
    setBirthday(artist.birthday);
    setEditing(true);
    setEditId(artist._id);
  }

  async function deleteArtist(id) {
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/artist/${id}`);
    alert("Artist deleted successfully");
    await loadArtists();
  }

  async function updateArtist(event) {
    event.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_SERVER}/artist/${editId}`, {
        name: name,
        birthday: birthday,
      });
      alert("Artist updated successfully");
      setName("");
      setBirthday("");
      setEditing(false);
      setEditId("");
      await loadArtists();
    } catch (err) {
      alert("Failed to update artist");
    }
  }

  return (
    <div className="container mt-4">
      <h1>Artist Details</h1>
      <form onSubmit={editing ? updateArtist : saveArtist}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            className="form-control"
            id="birthday"
            value={birthday}
            onChange={(event) => setBirthday(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? "Update" : "Register"}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              setEditing(false);
              setEditId("");
              setName("");
              setBirthday("");
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist._id}>
              <td>{artist._id}</td>
              <td>{artist.name}</td>
              <td>{new Date(artist.birthday).toLocaleDateString()}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editArtist(artist)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={() => deleteArtist(artist._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;