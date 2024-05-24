import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import data from "../data/faq.json";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const accList = data.faq;

const FaqComponent = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const showExpand = (id) => {
    setExpandedIndex((prevIndex) => (prevIndex === id ? null : id));
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      padding={"4%"}
      gap={"10px"}
      alignItems={"center"}
    >
      <Text fontSize={"4xl"}>Frequently Asked Questions</Text>
      {accList.map((item) => (
        <Box key={item.id} width={"70%"}>
          <Box
            display={"flex"}
            flexDir={"row"}
            justifyContent={"space-between"}
            boxShadow={"md"}
            bg={"gray.100"}
            padding={"2%"}
            cursor={"pointer"}
            onClick={() => showExpand(item.id)}
          >
            <Text>{item.question}</Text>
            {expandedIndex === item.id ? <MinusIcon /> : <AddIcon />}
          </Box>
          {expandedIndex === item.id && (
            <Box boxShadow={"md"} bg={"gray.50"} padding={"2%"}>
              <Text>{item.answer}</Text>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FaqComponent;
