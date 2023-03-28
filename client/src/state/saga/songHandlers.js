import { put } from "redux-saga/effects";
import {
  getlist,
  setList,
  setSongs,
  setSongStatics,
  setInfo,
} from "../songSlice";
import {
  getSongsAPI,
  getSongStaticsAPI,
  createSongsAPI,
  updateSongsAPI,
  deleteSongsAPI,
  getListAPI,
  getInfoAPI,
} from "../apis/songsApi";

export function* handleGetSongs(action) {
  try {
    const { payload } = action;
    const songs = yield getSongsAPI(payload);
    yield put(setSongs(songs.data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetSongStatics(action) {
  try {
    const songs = yield getSongStaticsAPI();
    yield put(setSongStatics(songs.data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateSong(action) {
  const { payload } = action;
  try {
    yield createSongsAPI(payload);
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateSong(action) {
  const { payload } = action;
  try {
    yield updateSongsAPI(payload);
  } catch (error) {
    console.log(error);
  }
}

export function* handleDeleteSong(action) {
  const { payload } = action;
  try {
    yield deleteSongsAPI(payload);
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetList(action) {
  try {
    const { payload } = action;
    const songs = yield getListAPI(payload);
    yield put(setList(songs.data));
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetInfo(action) {
  try {
    const { payload } = action;
    const songs = yield getInfoAPI(payload);
    yield put(setInfo(songs.data));
  } catch (error) {
    console.log(error);
  }
}
