import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import "../index.css";
import { Label, Input } from "@rebass/forms";
import { Box, Flex } from "rebass";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSong, updateSong } from "../state/songSlice";

export default function SongForm() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      setSong(location.state.song);
    }
  }, [params.id]);

  // const { song } = location.state;

  function submitSong(event) {
    event.preventDefault();
    const payload = {
      id,
      title: event.target["title"].value,
      artist: event.target["artist"].value,
      album: event.target["album"].value,
      genre: event.target["genre"].value,
    };

    if (id) {
      dispatch(updateSong({ ...payload }));
    } else {
      dispatch(createSong({ id, ...payload }));
    }

    event.target.reset();
    navigate("/");
  }
  return (
    <Box mx={7}>
      <form onSubmit={(e) => submitSong(e)}>
        <Box width={1} m={10}>
          <h3>Update Song</h3>
        </Box>
        <Box width={1} py={3} px={2}>
          <Flex mx={-2}>
            <Box width={1 / 2} px={2}>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="enter title"
                defaultValue={song ? song.title : ""}
              />
            </Box>

            <Box width={1 / 2} px={2}>
              <Label htmlFor="artist">Artist</Label>
              <Input
                placeholder="enter Artist"
                type="text"
                id="artist"
                defaultValue={song ? song.artist : ""}
              />
            </Box>
          </Flex>
          <Flex mx={-2}>
            <Box width={1 / 2} px={2}>
              <Label htmlFor="album">Album</Label>
              <Input
                placeholder="enter Album"
                type="text"
                id="album"
                defaultValue={song ? song.album : ""}
              />
            </Box>
            <Box width={1 / 2} px={2}>
              <Label htmlFor="genre">Genre</Label>
              <Input
                placeholder="enter genre"
                type="text"
                id="genre"
                defaultValue={song ? song.genre : ""}
              />
            </Box>
          </Flex>
        </Box>
        <br />
        <Flex mx={-2}>
          <Box width={1 / 4} px={3}>
            <Input
              type="submit"
              value="Update Song"
              disabled={isLoading}
              className="button_header"
              color="white"
              backgroundColor="#1595a3"
            />
            {isLoading && " Loading..."}
          </Box>
          <Box
            color="black"
            backgroundColor="#1595a3"
            width={100}
            p={9}
            className="button_header"
          >
            <Link to={"/"}>Cancel</Link>
          </Box>
        </Flex>
      </form>
    </Box>
  );
}
