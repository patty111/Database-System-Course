const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");

function artistRoutes(connection) {
    router.get("/", async (req, res) => {
        Artist.getAll(connection, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.get("/:artist_id", async (req, res) => {
        const { artist_id } = req.params;
        Artist.getByArtistId(connection, artist_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.post("/", async (req, res) => {
        // body-parser only handles JSON, need to convert form date to JSON first
        const { name, birthday } = req.body;    
        Artist.create(connection, name, birthday, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(201).send("New artist created");
            }
        });
    });

    router.put("/:artist_id", async (req, res) => {
        const { artist_id } = req.params;
        const { name, birthday } = req.body;
        Artist.update(connection, artist_id, name, birthday, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("Artist updated");
            }
        });
    });

    router.delete("/:artist_id", async (req, res) => {
        const { artist_id } = req.params;
        Artist.delete(connection, artist_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("Artist deleted");
            }
        });
    });
    
    return router;
}

module.exports = artistRoutes;