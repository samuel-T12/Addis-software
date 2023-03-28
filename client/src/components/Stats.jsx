import React, { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Heading, Text } from "rebass";

import { useDispatch, useSelector } from "react-redux";
import { getlist, getSongStatics, getInfo } from "../state/songSlice";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";

export default function Stats() {
  // const { stats } = useSelector((s: any) => s.song);
  const { stats: total } = useSelector((state) => state.song);
  const { list: lists } = useSelector((state) => state.song);
  const { info: stats } = useSelector((state) => state.song);
  const [type, setTypeValue] = useState("album");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const cirlce = {
    borderWidth: "12px",
    backgroundColor: "#1595a3",
    width: "120px",
    height: "120px",
    borderRadius: "100px",
    justifyContent: "center",
    display: "flex",
    color: "white",
    alignItems: "center",
    fontSize: "32px",
  };

  useEffect(() => {
    setIsLoading(true);

    dispatch(getlist("album"));
    dispatch(getSongStatics({}));

    setIsLoading(false);
  }, []);
  useEffect(() => {
    setIsLoading(true);

    dispatch(getlist(type.toLocaleLowerCase()));
    setIsLoading(false);
  }, [type]);

  function getData() {
    console.log("sdf");
    dispatch(getInfo({ type: type.toLocaleLowerCase(), value }));
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Heading
          css={{
            color: "Black",
          }}
        >
          Total Stats
        </Heading>
      </div>
      <Box css={{ padding: "12px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: "60px",
          }}
        >
          {/* <div>{stats}</div> */}
          <Card width={80}>
            {/* <Image src={logo} /> */}
            <div style={cirlce}>
              <span>{total.totalSongs}</span>
            </div>
            <Heading marginLeft={"32px"}>Songs </Heading>
          </Card>

          <Card width={80}>
            <div style={cirlce}>
              <span>{total.totalAlbums}</span>
            </div>
            <Heading marginLeft={"20px"}>Albums</Heading>
          </Card>

          <Card width={80}>
            <div style={cirlce}>
              <span>{total.totalArtists}</span>
            </div>
            <Heading marginLeft={"32px"}>Artists </Heading>
          </Card>

          <Card width={80}>
            <div style={cirlce}>
              <span>{total.totalGenres}</span>
            </div>
            <Heading marginLeft={"32px"}>Genres</Heading>
          </Card>
        </div>

        <hr></hr>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <Box>
            <Text
              css={{
                marginBottom: "8px",
              }}
            >
              Select Type
            </Text>
            <Select
              onChange={(e) => setTypeValue(e.target.value)}
              style={{
                width: "100px",
              }}
              id="type"
              name="type"
              defaultValue="Album"
            >
              <option>Album</option>
              <option>Genre</option>
              <option>Artist</option>
            </Select>
          </Box>
          <Box>
            <Text
              css={{
                marginBottom: "8px",
              }}
            >
              Select Value
            </Text>
            <Select
              onChange={(e) => setValue(e.target.value)}
              style={{
                width: "100px",
              }}
              id="type"
              name="type"
              defaultValue="Album"
            >
              {lists?.items.map((data) => (
                <option key={data}>{data}</option>
              ))}
            </Select>
          </Box>
          <Box>
            <Button
              css={{
                marginTop: "24px",
              }}
              backgroundColor={"#1595a3"}
              variant="primary"
              mr={2}
              onClick={getData}
            >
              Get Info
            </Button>
          </Box>
        </div>

        {Object.keys(stats.data).map((data) => (
          <div
            style={{
              backgroundColor: "#1595a3",
            }}
            key={data}
          >
            <Flex>
              <Box
                css={{
                  fontSize: "24px",
                }}
                p={3}
                width={1 / 2}
                color="white"
              >
                {data.substring(0, 5).toUpperCase()}{" "}
                {data.substring(5, data.length).toUpperCase()}
              </Box>
              <Box
                css={{
                  fontSize: "24px",
                }}
                p={3}
                width={1 / 2}
                color="white"
              >
                {stats.data[data]}
              </Box>
            </Flex>
          </div>
        ))}
      </Box>
    </>
  );
}
