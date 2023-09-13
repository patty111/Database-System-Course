const { v4: uuidv4 } = require('uuid');

class Album {
    static getAll(connection, callback) {
        const sql = "SELECT * FROM Album";
        connection.query(sql, callback);
    }

    static getByAlbumId(connection, album_id, callback) {
        const sql = "SELECT * FROM Album WHERE album_id = ?";
        const values = [album_id];
        connection.query(sql, values, callback);
    }

    static create(connection, title, artist_id, genre_id, callback) {
      const sql = "INSERT INTO Album (album_id, title, artist_id, genre_id) VALUES (?, ?, ?, ?)";
      const album_id = uuidv4();
      const values = [album_id, title, artist_id, genre_id];
      connection.query(sql, values, callback);
    }

    static update(connection, album_id, title, artist_id, genre_id, callback) {
        const sql = "UPDATE Album SET title = ?, artist_id = ?, genre_id = ? WHERE album_id = ?";
        const values = [title, artist_id, genre_id, album_id];
        connection.query(sql, values, callback);
    }

    static delete(connection, album_id, callback) {
        const sql = "DELETE FROM Album WHERE album_id = ?";
        const values = [album_id];
        connection.query(sql, values, callback);
    }

  }
  
  module.exports = Album;