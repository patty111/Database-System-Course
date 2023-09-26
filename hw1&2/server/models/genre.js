const { v4: uuidv4 } = require('uuid');

class Genre {
    static getAll(connection, callback) {
        const sql = "SELECT * FROM Genre";
        connection.query(sql, callback);
    }

    static getByGenreId(connection, genre_id, callback) {
        const sql = "SELECT * FROM Genre WHERE genre_id = ?";
        const values = [genre_id];
        connection.query(sql, values, callback);
    }

    static create(connection, name, callback) {
        const sql = "INSERT INTO Genre (genre_id, name) VALUES (?, ?)";
        const genre_id = uuidv4();
        const values = [genre_id, name];
        connection.query(sql, values, callback);
    }

    static update(connection, genre_id, name, callback) {
        const sql = "UPDATE Genre SET name = ? WHERE genre_id = ?";
        const values = [name, genre_id];
        connection.query(sql, values, callback);
    }

    static delete(connection, genre_id, callback) {
        const sql = "DELETE FROM Genre WHERE genre_id = ?";
        const values = [genre_id];
        connection.query(sql, values, callback);
    }
}


module.exports = Genre;