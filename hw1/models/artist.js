const { v4: uuidv4 } = require('uuid');

class Artist {
    static getAll(connection, callback) {
        const sql = "SELECT * FROM Artist";
        connection.query(sql, callback);
    }

    static getByArtistId(connection, artist_id, callback) {
        const sql = "SELECT * FROM Artist WHERE artist_id = ?";
        const values = [artist_id];
        connection.query(sql, values, callback);
    }

    static create(connection, name, birthday, callback) {
        const sql = "INSERT INTO Artist (artist_id, name, birthday) VALUES (?, ?, ?)";
        const artist_id = uuidv4();
        const values = [artist_id, name, birthday];
        connection.query(sql, values, callback);
    }

    static update(connection, artist_id, name, birthday, callback) {
        const sql = "UPDATE Artist SET name = ?, birthday = ? WHERE artist_id = ?";
        const values = [name, birthday, artist_id];
        connection.query(sql, values, callback);
    }

    static delete(connection, artist_id, callback) {
        const sql = "DELETE FROM Artist WHERE artist_id = ?";
        const values = [artist_id];
        connection.query(sql, values, callback);
    }
}


module.exports = Artist;