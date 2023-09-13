const express = require("express");
const router = express.Router();
const Genre = require("../models/genre");

function genreRoutes(connection) {
    router.get("/", async (req, res) => {
        Genre.getAll(connection, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.get("/:genre_id", async (req, res) => {
        const { genre_id } = req.params;
        Genre.getByGenreId(connection, genre_id, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.post("/", async (req, res) => {
        const { name } = req.body;
        Genre.create(connection, name, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(201).send("New genre created");
            }
        });
    });

    router.put("/:genre_id", async (req, res) => {
        const { genre_id } = req.params;
        const { name } = req.body;
        Genre.update(connection, genre_id, name, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("Genre updated");
            }
        });
    });

    router.delete("/:genre_id", async (req, res) => {
        const { genre_id } = req.params;
        Genre.delete(connection, genre_id, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("Genre deleted");
            }
        });
    });

    return router;
}

module.exports = genreRoutes;