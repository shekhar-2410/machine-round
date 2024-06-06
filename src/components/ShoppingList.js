import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Input,
  Text,
  Checkbox,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ShoppingList = () => {
  const [value, setVlaue] = useState("");
  const [shoppingItem, setShoppingItem] = useState([]);
  const [strip, setStrip] = useState(false);
  console.log(strip);
  const shoppingList = [
    "Apples",
    "Bananas",
    "Oranges",
    "Broccoli",
    "Carrots",
    "Spinach",
    "Tomatoes",
  ];
  const changeEvent = (e) => {
    const lowercase = e.target.value.toLowerCase();
    setVlaue(lowercase);
  };
  const filterData = shoppingList.filter((data) => {
    if (value === "") {
      return true;
    } else if (data.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  const handleStrip = () => {
    setStrip(!strip);
  };

  return (
    <Box py={"10px"}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={"20px"}
      >
        <Text fontSize={"3xl"}>Shopping List</Text>
        <Input
          boxShadow={"md"}
          width={"lg"}
          variant={"filled"}
          placeholder="Enter item"
          zIndex={0}
          onChange={changeEvent}
          type="search"
        />
        {value.length > 0 && (
          <Box
            cursor={"pointer"}
            zIndex={10}
            boxShadow={"md"}
            width={"lg"}
            mt={"-20px"}
          >
            {filterData.map((item) => (
              <Box
                onClick={() => {
                  setShoppingItem([...shoppingItem, item]);
                }}
                my={"2px"}
                py={"5px"}
                background={"gray.200"}
                key={item}
                _hover={{ background: "gray.300" }}
              >
                <Text>{item}</Text>
              </Box>
            ))}
          </Box>
        )}
        <Box
          border={"1px solid gray.200"}
          borderRadius={"5px"}
          width="lg"
          boxShadow="md"
          padding="10px"
        >
          <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
            Bucket List
          </Text>
          {shoppingItem.length > 0 ? (
            shoppingItem.map((item, index) => (
              <HStack key={index} my={"10px"}>
                <Checkbox onChange={handleStrip} size="md" colorScheme="green">
                  {strip === true ? (
                    <Text as="s" color={"gray.600"}>
                      {item}
                    </Text>
                  ) : (
                    <Text>{item}</Text>
                  )}
                </Checkbox>
                <Spacer />
                <Button
                  colorScheme="red"
                  leftIcon={<DeleteIcon marginLeft={"5px"} />}
                  onClick={()=>{
                    setShoppingItem(shoppingItem.filter((data)=>data!==item))
                  }}
                />
              </HStack>
            ))
          ) : (
            <Text fontSize="lg">No item added</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ShoppingList;
