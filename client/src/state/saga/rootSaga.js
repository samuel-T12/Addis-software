import { takeLatest } from "redux-saga/effects";
import {
  handleGetSongs,
  handleGetSongStatics,
  handleCreateSong,
  handleUpdateSong,
  handleDeleteSong,
  handleGetList,
  handleGetInfo,
} from "./songHandlers";
import {
  getSongs,
  getSongStatics,
  createSong,
  updateSong,
  deleteSong,
  getlist,
  getInfo,
} from "../songSlice";

export function* watcherSaga() {
  yield takeLatest(getSongs.type, handleGetSongs);
  yield takeLatest(getSongStatics.type, handleGetSongStatics);
  yield takeLatest(createSong.type, handleCreateSong);
  yield takeLatest(updateSong.type, handleUpdateSong);
  yield takeLatest(deleteSong.type, handleDeleteSong);
  yield takeLatest(getlist.type, handleGetList);
  yield takeLatest(getInfo.type, handleGetInfo);
}
