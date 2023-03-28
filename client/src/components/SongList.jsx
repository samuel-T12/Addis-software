import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { Box, Button, Card, Flex } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, getSongStatics, deleteSong } from "../state/songSlice.js";
import styled from "styled-components";
import { variant } from "styled-system";

const ButtonStyled = styled("button")(
  {
    appearance: "none",
    fontFamily: "inherit",
    marginRight: 10,
    paddingTop: 7,
    textAlign: "center",
    width: 60,
    color: "white",
    backgroundColor: "#1595a3",
    borderRadius: 5,
    border: "transparent 0",
  },
  variant({
    variants: {
      primary: {
        color: "white",
        bg: "primary",
      },
      secondary: {
        color: "white",
        bg: "secondary",
      },
    },
  })
);

const ButtonStyledAdd = styled("button")(
  {
    appearance: "none",
    fontFamily: "inherit",
    marginBottom: 10,
    padding: 10,
    textAlign: "center",
    width: 100,
    color: "white",
    backgroundColor: "#1595a3",
    borderRadius: 5,
    border: "transparent 0",
  },
  variant({
    variants: {
      primary: {
        color: "white",
        bg: "primary",
      },
      secondary: {
        color: "white",
        bg: "secondary",
      },
    },
  })
);

export default function SongList() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { song: songs } = useSelector((state) => state.song);

  const limit = 10;
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(songs?.total / limit);

  const dispatch = useDispatch();
  const payload = { page, limit: 10 };

  useEffect(() => {
    setIsLoading(true);

    dispatch(getSongs(payload));

    setIsLoading(false);
  }, [dispatch, page]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  function removeSong(event, id) {
    event.preventDefault();
    dispatch(deleteSong({ id }));
    setTimeout(() => {
      dispatch(getSongs(payload));
      dispatch(getSongStatics());

      navigate("/");
    }, 1000);
  }

  return (
    <Box mx={6}>
      <Card
        p={4}
        sx={{
          p: 1,
        }}
      >
        <Box>
          <ButtonStyledAdd>
            <Link to={"/new"} className="button_header">
              Add New
            </Link>
          </ButtonStyledAdd>
        </Box>
        <Flex width={900}>
          <Box width={1 / 5}>Title</Box>
          <Box width={1 / 5}>Artist</Box>
          <Box width={1 / 5}>Album</Box>
          <Box width={1 / 5}>Genre</Box>
          <Box width={1 / 5}>Action</Box>
        </Flex>
        <Box width={750} mb={3}>
          <hr />
        </Box>
        {songs?.items.map((song) => (
          <Flex key={song.id} width={900}>
            <Box width={1 / 5}>{song.title}</Box>
            <Box width={1 / 5}>{song.artist}</Box>
            <Box width={1 / 5}>{song.album}</Box>
            <Box width={1 / 5}>{song.genre}</Box>
            <Flex width={50}>
              <Box width={1 / 2}>
                <Link to={`/update/${song.id}`} state={{ song: song }}>
                  <Box py={2} size={20}>
                    <svg
                      enable-background="new 0 0 19 19"
                      height="19px"
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 19 19"
                      width="19px"
                      xml:space="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <g>
                        <path
                          d="M8.44,7.25C8.348,7.342,8.277,7.447,8.215,7.557L8.174,7.516L8.149,7.69   C8.049,7.925,8.014,8.183,8.042,8.442l-0.399,2.796l2.797-0.399c0.259,0.028,0.517-0.007,0.752-0.107l0.174-0.024l-0.041-0.041   c0.109-0.062,0.215-0.133,0.307-0.225l5.053-5.053l-3.191-3.191L8.44,7.25z"
                          fill="#231F20"
                        />
                        <path
                          d="M18.183,1.568l-0.87-0.87c-0.641-0.641-1.637-0.684-2.225-0.097l-0.797,0.797l3.191,3.191l0.797-0.798   C18.867,3.205,18.824,2.209,18.183,1.568z"
                          fill="#231F20"
                        />
                        <path
                          d="M15,9.696V17H2V2h8.953l1.523-1.42c0.162-0.161,0.353-0.221,0.555-0.293   c0.043-0.119,0.104-0.18,0.176-0.287H0v19h17V7.928L15,9.696z"
                          fill="#231F20"
                        />
                      </g>
                    </svg>
                  </Box>
                </Link>
              </Box>
              <Box width={1 / 2}>
                <Button
                  backgroundColor="transparent"
                  color="#6060F4"
                  onClick={(e) => removeSong(e, song.id)}
                  className="Delete"
                >
                  <Box size={20}>
                    <svg
                      enable-background="new 0 0 26 29"
                      height="19px"
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 26 29"
                      width="26px"
                      xml:space="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <g>
                        <path
                          d="M1.035,9l3.49,17.478C4.525,27.854,5.643,29,7.019,29H13h5.981c1.376,0,2.493-1.146,2.493-2.522L24.965,9   H13H1.035z"
                          fill="#231F20"
                        />
                        <path
                          d="M23.524,3H21V2.824C21,1.264,19.736,0,18.176,0H7.824C6.264,0,5,1.264,5,2.824V3H2.476   C0.946,3,0,3.939,0,5.468V7h7.824h10.352H26V5.468C26,3.939,25.053,3,23.524,3z"
                          fill="#231F20"
                        />
                      </g>
                    </svg>
                  </Box>
                </Button>
              </Box>
            </Flex>
          </Flex>
        ))}

        <Flex my={2}>
          <ButtonStyled
            color="white"
            backgroundColor="##1595a3"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <Flex width="full">
              <Box width={20} color="white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </Box>
              <Box>Prev</Box>
            </Flex>
          </ButtonStyled>
          <ButtonStyled
            mx={2}
            color="white"
            backgroundColor="#1595a3"
            disabled={totalPage <= page}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <Flex width="full">
              <Box>Next</Box>
              <Box width={20} color="white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Box>
            </Flex>
          </ButtonStyled>
        </Flex>
      </Card>
    </Box>
  );
}
