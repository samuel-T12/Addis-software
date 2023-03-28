import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Text, Flex, Link } from "rebass";
import logo from "./music.png";
const Layout = () => {
  return (
    <>
      <Flex flexDirection={"row"} style={{ width: "100%" }}>
        <Box width={1 / 5}>
          <div>
            <Flex
              flexDirection={"row"}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box p={3} color="white" bg="gray">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link href="/">
                    <img height={100} width={100} src={logo}></img>
                  </Link>
                </div>
                <Text color="white">Addis Music</Text>
              </Box>
              <Box p={3} color="white" bg="#4a4e69">
                <Link color="white" href="/">
                  Songs
                </Link>
              </Box>
              <Box p={3} bg="#4a4e69">
                <Link color="white" href="stats">
                  {" "}
                  Songs Stats
                </Link>
              </Box>
            </Flex>
          </div>
        </Box>
        <Box width={4 / 5}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
