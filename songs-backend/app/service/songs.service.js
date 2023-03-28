const db = require("../models");
const Song = db.songs;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.createSong = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a song
  const song = new Song({
    title: req.body.title,
    album: req.body.album,
    genre: req.body.genre,
    artist: req.body.artist,
  });

  // Save song in the database
  song
    .save(song)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the song.",
      });
    });
};

exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Song.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        total: data.totalDocs,
        items: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Song.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found song with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving song with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Song.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update song with id=${id}. Maybe song was not found!`,
        });
      } else res.send({ message: "song was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating song with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Song.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete song with id=${id}. Maybe song was not found!`,
        });
      } else {
        res.send({
          message: "song was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete song with id=" + id,
      });
    });
};
exports.deleteAll = (req, res) => {
  Song.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} songs were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all songs.",
      });
    });
};

exports.getTotals = async (req, res) => {
  let totalGenres, totalArtists, totalAlbums;
  const totalSongs = await Song.find();
  await Song.collection.distinct("genre", function (error, results) {
    totalGenres = results.length;
  });
  await Song.collection.distinct("album", function (error, results) {
    totalAlbums = results.length;
  });
  await Song.collection.distinct("artist", function (error, results) {
    totalArtists = results.length;
  });
  res.send({
    totalSongs: totalSongs.length,
    totalAlbums,
    totalArtists,
    totalGenres,
  });
};
// total songs in every genre
//todo fix genreResult object issue
exports.test = async (req, res) => {
  // let  = [];
  // let genreResult = [];
  let genre = await Song.collection.distinct("genre");
  console.log(genre);
};

async function getTotalAlbumsAndSongs(data) {
  const { type, value } = data;
  console.log("ppsd", data);

  try {
    if (type === "artist") {
      const [song, albumCount, genre] = await Promise.all([
        await Song.find({ artist: value }),

        await Song.collection.distinct("album", { artist: value }),

        await Song.collection.distinct("genre", { artist: value }),
      ]);
      const result = {
        totalSongs: song.length,
        totalAlbum: albumCount.length,
        totalGenre: genre.length,
      };

      return result;
    }
    if (type === "album") {
      const [song, artist, genre] = await Promise.all([
        await Song.find({ album: value }),

        await Song.collection.distinct("artist", { album: value }),

        await Song.collection.distinct("genre", { album: value }),
      ]);
      const result = {
        totalSongs: song.length,
        totalArtists: artist.length,
        totalGenre: genre.length,
      };

      return result;
    }
    if (type === "genre") {
      const [song, artist, album] = await Promise.all([
        await Song.find({ genre: value }),

        await Song.collection.distinct("artist", { genre: value }),

        await Song.collection.distinct("album", { genre: value }),
      ]);
      const result = {
        totalSongs: song.length,
        totalArtists: artist.length,
        totalAlbums: album.length,
      };

      return result;
    }

    // const pr = Promise(
    //   albumCount.map(async (element) => {
    //     const send = {
    //       album: element,
    //       songs: await getTotalSongsofAlbum(element),
    //     };
    //     return send;
    //   })
    // ).then((res) => console.log("pp", res));
  } catch (error) {
    return error;
  }

  // let albumResult = {};

  // const artistInfo = {
  //   albums: albumResult,
  //   songs: songs.length,
  // };
  // return await artistInfo;
}

async function getTotalSongsofAlbum(album) {
  const songs = await Song.find({ album });
  return songs.length;
}

exports.getAllWithConditions = (req, res) => {
  const offset = 0;
  const limit = 0;
  let conditions = {};
  const { artist, album, genre, title } = req.query;
  if (req.query.artist) {
    conditions = { ...conditions, artist };
  }
  if (req.query.album) {
    conditions = { ...conditions, album };
  }
  if (req.query.genre) {
    conditions = { ...conditions, genre };
  }
  if (req.query.title) {
    conditions = { ...conditions, title };
  }
  console.log(req.query);
  Song.paginate(conditions, { offset })
    .then((data) => {
      res.send({
        total: data.totalDocs,
        items: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
  // let filteredSongs = Song.find(conditions).then((result) => {
  //   res.send(result);
  // });
  // console.log(filteredSongs);
};

// return lists with params

exports.getList = (req, res) => {
  Song.collection.distinct(req.query.type, function (error, results) {
    res.send({ items: results, total: results.length });
  });
};

exports.stat = async (req, res) => {
  const { artist, album, genre } = req.query;
  console.log(req.query);
  if (artist) {
    const info = await getTotalAlbumsAndSongs({
      type: "artist",
      value: artist,
    });
    res.send({ data: info });
  }
  if (album) {
    const info = await getTotalAlbumsAndSongs({
      type: "album",
      value: album,
    });
    res.send({ data: info });
  }
  if (genre) {
    const info = await getTotalAlbumsAndSongs({
      type: "genre",
      value: genre,
    });
    res.send({ data: info });
  }
};

async function countSongs(data) {
  temp = await Song.find({ genre: data });
  console.log("ddf0", temp.length);
  return temp.length;
}
