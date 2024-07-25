import {
  Box,
  Image,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const lastIndex = data.length - 1;

  const getData = async () => {
    try {
      const fetchData = await fetch("https://dummyjson.com/products");
      const data = await fetchData.json();
      if (data && data.products) {
        setData(data.products);
        console.log(data.products);
      }
    } catch (err) {
      console.log(`error found ${err}`);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPagev = () => {
    setPage((prev) => prev - 1);
  };

  const setCurrentPage = (pageNum) => {
    setPage(pageNum);
  };
  return (
    <Box padding={"2%"}>
      <Text fontSize={"3xl"} textAlign={"center"}>
        Products
      </Text>
      {/* table */}
      <Table varient="striped" colorScheme="orange">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Title</Th>
            <Th>category</Th>
            <Th>price</Th>
            <Th>rating</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.slice((page - 1) * 5, page * 5).map((item) => {
            return (
              <Tr>
                <Td>
                   
                  <Image height={"100px"} src={item.thumbnail} />
                </Td>
                <Td>{item.title}</Td>
                <Td>{item.category}</Td>
                <Td>{item.price}</Td>
                <Td>{item.rating}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* pagination */}
      {data.length > 0 && (
        <Box
          justifyContent={"space-around"}
          display={"flex"}
          flexDir={"row"}
          mt={"10"}
        >
            {/* prev-page */}
          {page === 1 ? (
            <Button disabled>Privious page</Button>
          ) : (
            <Button colorScheme="teal" onClick={prevPagev}>
              Privious page
            </Button>
          )}
{/* current-page */}
          {[...Array(data.length / 5)].map((_, index) => {
            return (
              <Button
                color={page === index + 1 ? "#fff" : "black"}
                background={page === index + 1 ? "teal" : "gray.200"}
                onClick={() => {
                  setCurrentPage(index + 1);
                }}
                borderRadius={"50%"}
                key={index}
              >
                {index + 1}
              </Button>
            );
          })}

{/* next-page */}
          {lastIndex < page * 5 ? (
            <Button disabled>Next page</Button>
          ) : (
            <Button colorScheme="teal" onClick={nextPage}>
              Next page
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Pagination;
