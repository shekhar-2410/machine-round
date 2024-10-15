import { Box, Image, Heading, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Infinitecroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=${page}&sparkline=false`
      );

      const data = await res.json();
      if (data.length === 0) {
        setLoading(false);
        return;
      }
      setData((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box background="black" width={"100%"} >
      <Heading py={"30px"} color={"yellow"}>
        Crypto Gallery
      </Heading>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems="center"
        width="100%"
        padding={"10px"}
        gap={"100px"}
      >
        {data.length > 0 &&
          data.map((item) => (
            <Box
              key={item.id}
              width={"15%"}
              height={"200px"}
              padding={"10px"}
              borderRadius={"10px"}
              background={"white"}
              mt={"2%"}
              _hover={{
                border: "1px solid yellow",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                transform: "scale(1.1)",
              }}
            >
              <>
                <Image my={"10px"} mx={"auto"} src={item.image} width={"50%"} />
                <h1>{item.name}</h1>
                <p>{item.current_price}</p>
              </>
            </Box>
          ))}
      </Box>
      {loading && <Spinner color="yellow" />}
    </Box>
  );
};

export default Infinitecroll;
