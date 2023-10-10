const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");

router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/:artist_id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.artist_id);
    if (!artist) {
      res.status(404).send("Artist not found");
    } else {
      res.status(200).json(artist);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).send("New artist created");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.put("/:artist_id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.artist_id, req.body);
    if (!artist) {
      res.status(404).send("Artist not found");
    } else {
      res.status(200).send("Artist updated");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete("/:artist_id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.artist_id);
    if (!artist) {
      res.status(404).send("Artist not found");
    } else {
      res.status(200).send("Artist deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;