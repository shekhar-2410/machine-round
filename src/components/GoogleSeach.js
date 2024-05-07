import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { type } from "@testing-library/user-event/dist/type";
const GoogleSeach = () => {
  const [api, setApi] = useState([]);
  const [countyname, setCountryname] = useState("");
  const [text, setText] = useState("");
  console.log(text);
  const fetchCountryName = async () => {
    try {
      const fetchData = await fetch("https://restcountries.com/v3.1/all");
      const data = await fetchData.json();

      setApi(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const searchCountry = (e) => {
    const lowercase = e.target.value.toLowerCase();
    setCountryname(lowercase);
  };

  const filterData = api.filter((data) => {
    if (countyname === "") {
      return true; // Show all items when search input is empty
    } else if (
      data.name.common.toLowerCase().includes(countyname.toLowerCase())
    ) {
      return true; // Show items that match the search input
    } else {
      return false; // Hide items that don't match the search input
    }
  });

  useEffect(() => {
    fetchCountryName();
  }, []);
  return (
    <>
      <HStack spacing="24px" justify={"center"}>
        {/* <GoogleSeach /> */}
        <Text mt={"10%"} fontSize={"lg"}>
          Google Search
        </Text>
      </HStack>
      <Box mt={"10px"} width={"md"} mx={"auto"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            borderColor={"blue.500"}
            type="search"
            placeholder="search"
            onChange={searchCountry}
          />
        </InputGroup>
      </Box>

      {countyname?.length > 0 ? (
        <Box
          width={"md"}
          mx={"auto"}
          shadow={"md"}
          borderColor={"blue.500"}
          marginTop={"-10px"}
          height={"400px"}
          overflowY={"auto"}
        >
          {filterData.map((item) => (
            <Text
              onClick={() => {
                setText(item.name.common);
              }}
              key={item.id}
              py={"1rem"}
              style={{ cursor: "pointer" }}
              _hover={{ fontSize: "18px" }}
            >
              {item.name.common}
            </Text>
          ))}
        </Box>
      ) : null}
      <Text>{text}</Text>
    </>
  );
};

export default GoogleSeach;
