import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const App = () => {
  const boxes = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const [order, setOrder] = useState([]);
  console.log(order);

  const confgOrder = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    setTimeout(() => {
      setOrder((prevOrder) => {
        const [_, ...rest] = prevOrder;
        return rest;
      });
    }, 5000);
  };

  return (
    <Box mx={"auto"}>
      <Text fontSize="3xl" mb={4}>
        Grid Light
      </Text>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${boxes[0].length}, 1fr)`}
        gap={4}
        ml={"20%"}
      >
        {boxes
          .flat()
          .map((value, index) =>
            value === 1 ? (
              <Box
                onClick={() => confgOrder(index)}
                key={index}
                bg={order.includes(index) ? "blue.500" : "gray"}
                w="100px"
                h="100px"
              />
            ) : (
              <Box key={index} />
            )
          )}
      </Box>
    </Box>
  );
};

export default App;
