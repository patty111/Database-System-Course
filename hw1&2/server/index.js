const express = require("express");
const mysql = require("mysql");
const albumRouter = require("./routes/album");
const artistRouter = require("./routes/artist");
const genreRouter = require("./routes/genre");
const cors = require("cors");

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '1234',
  database: 'db'
});


app.use(express.json());
app.use("/api/albums", albumRouter(connection));
app.use("/api/artists", artistRouter(connection));
app.use("/api/genres", genreRouter(connection));

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});