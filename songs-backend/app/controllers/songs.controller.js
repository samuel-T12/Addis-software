// const db = require("../models");
const songService = require("../service/songs.service");

// Create and Save a new song
exports.create = (req, res) => {
  // Validate request

  return songService.createSong(req, res);
};

// Retrieve all songs from the database.

exports.findAll = (req, res) => {
  return songService.findAll(req, res);
};

// Find a single song with an id
exports.findOne = (req, res) => {
  return songService.findOne(req, res);
};

// Update a song by the id in the request

exports.update = (req, res) => {
  return songService.update(req, res);
};
// Delete a song with the specified id in the request
exports.delete = (req, res) => {
  return songService.delete(req, res);
};

// Delete all songs from the database.
exports.deleteAll = (req, res) => {
  return songService.deleteAll(req, res);
};

// Find all published songs
exports.findAllPublished = (req, res) => {
  song
    .find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
};

// get info
exports.stat = (req, res) => {
  return songService.stat(req, res);
};
exports.lists = (req, res) => {
  return songService.getList(req, res);
};
exports.getTotals = (req, res) => {
  return songService.getTotals(req, res);
};

exports.getall = (req, res) => {
  return songService.getAllWithConditions(req, res);
};

exports.test = (req, res) => {
  return songService.test(req, res);
};
