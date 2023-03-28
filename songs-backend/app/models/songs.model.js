module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      title: String,
      artist: String,
      album: String,
      genre: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  schema.plugin(mongoosePaginate);

  const Song = mongoose.model("song", schema);
  return Song;
};
