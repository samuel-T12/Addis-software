module.exports = (app) => {
  const song = require("../controllers/songs.controller.js");

  var router = require("express").Router();

  // Create a new song
  router.post("/", song.create);

  // Retrieve all songs
  router.get("/", song.findAll);

  // Retrieve all published songs
  router.get("/published", song.findAllPublished);

  // Retrieve a single song with id
  router.get("/:id", song.findOne);

  // Update a song with id
  router.put("/:id", song.update);

  // Delete a song with id
  router.delete("/:id", song.delete);

  // Delete all songs
  router.delete("/", song.deleteAll);
  router.get("/report/get-totals", song.getTotals);
  router.get("/report/getall", song.getall);
  router.get("/test/test", song.test);
  router.get("/report/get-stat", song.stat);
  router.get("/report/get-list", song.lists);
  app.use("/api/songs", router);
};
