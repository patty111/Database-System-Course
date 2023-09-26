const express = require("express");
const router = express.Router();
const Album = require("../models/album");

function albumRoutes(connection) {
    router.get("/", async (req, res) => {
        Album.getAll(connection, (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send(err);
            }else{
                res.status(200).json(results);
            }
        });
    });

    router.get("/:album_id", async (req, res) => {
        const { album_id } = req.params;
        Album.getByAlbumId(connection, album_id, (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send(err);
            }else{
                res.status(200).json(results);
            }
        });
    });

    router.post("/", async (req, res) => {
        const { title, artist_id, genre_id } = req.body;
        Album.create(connection, title, artist_id, genre_id, (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send(err);
            }else{
                res.status(201).send("New album created");
            }
        });
    });

    router.put("/:album_id", async (req, res) => {
        const { album_id } = req.params;
        const { title, artist_id, genre_id } = req.body;
        Album.update(connection, album_id, title, artist_id, genre_id, (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send(err);
            }else{
                res.status(200).send("Album updated");
            }
        });
    });

    router.delete("/:album_id", async (req, res) => {
        const { album_id } = req.params;
        Album.delete(connection, album_id, (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send(err);
            }else{
                res.status(200).send("Album deleted");
            }
        });
    });

    return router;
}

module.exports = albumRoutes;