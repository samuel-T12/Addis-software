import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "song",
  initialState: {
    song: {
      total: 0,
      items: [],
    },
    stats: {
      totalSongs: [],
      sotalAlbums: [],
      totalArtists: [],
      totalGenres: [],
    },
    list: {
      items: [],
      total: 0,
    },
    info: {
      data: {},
    },
  },
  reducers: {
    getSongs(state, action) {},
    setSongs(state, action) {
      const song = action.payload;
      state.song = song;
      return state;
    },
    getSongStatics(state, action) {},
    setSongStatics(state, action) {
      const statics = action.payload;
      state.stats = statics;
      return state;
    },
    createSong(state, action) {
      return state;
    },
    updateSong(state, action) {
      return state;
    },
    deleteSong(state, action) {
      return state;
    },
    getlist(state, action) {},
    setList(state, action) {
      const data = action.payload;
      state.list = data;
      return state;
    },
    getInfo(state, action) {},
    setInfo(state, action) {
      const data = action.payload;
      console.log("state", data);
      state.info = data;
      return state;
    },
  },
});

export const {
  getSongs,
  setSongs,
  getSongStatics,
  setSongStatics,
  createSong,
  updateSong,
  deleteSong,
  getlist,
  setList,
  setInfo,
  getInfo,
} = songSlice.actions;

export default songSlice.reducer;
