import { Box, Image, Heading, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=8`
      );
      const newData = await res.json();

      // Filter out duplicate items based on their id
      setData((prevData) => {
        const newItems = newData.filter(
          (item) => !prevData.some((prevItem) => prevItem.id === item.id)
        );
        return [...prevData, ...newItems];
      });

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
  }, [data]);

  return (
    <Box background="black" width={"100%"}>
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
        gap={"40px"}
      >
        {data.length > 0 &&
          data.map((item) => (
            <Box
              key={item.id}
              width={"300px"}
              height={"fit-content"}
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
                <Image loading="lazy" boxShadow={"lg"} borderRadius={"10px"} my={"10px"} mx={"auto"} src={item?.download_url} width={"90%"} height={"200px"} />
                <h1>{item?.author}</h1>
              
              </>
            </Box>
          ))}
      </Box>
      {loading && <Spinner color="yellow" />}
    </Box>
  );
};

export default InfiniteScroll;
