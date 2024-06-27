import React, { useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
const Calculator = () => {
  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "/",
    "c",
    ".",
    "=",
  ];
  const [value, setValue] = useState("");
  const handleOnchange = (e) => {
    let change = e.target.vale;
    setValue(change);
  };
  const handleOnclick = (e) => {
    const id = e.target.id;
    if (id === "c") {
      setValue("");
    } else if (id === "=") {
      //result
      setValue(eval(value));
    } else {
      setValue((val) => val + id);
    }
  };
  return (
    <Box
      pt={"20px"}
      display={"flex"}
      gap={"20px"}
      flexDir={"column"}
      justifyContent={"center"}
    >
      <Text fontWeight={"bold"} fontSize={"2xl"}>
        Calculator
      </Text>
      <Input
        value={value}
        borderColor={"black"}
        mx={"auto"}
        type="text"
        placeholder="Enter number"
        width="xs"
        onChange={handleOnchange}
      />
      <Box
        mx={"auto"}
        gap={"15px"}
        display={"grid"}
        gridTemplateColumns={"repeat(4,1fr)"}
        onClick={handleOnclick}
      >
        {numbers.map((number, index) => (
          <Button id={number} colorScheme="teal" width={"70px"} key={index}>
            {number}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Calculator;
