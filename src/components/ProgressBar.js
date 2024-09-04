import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
const ProgressBar = ({ value = 0 }) => {
  const [percentage, setPercentage] = useState(value);
  useEffect(() => {
    setPercentage(Math.min(100, Math.max(value, 0)));
  }, [value]);
  return (
    <Box>
      <Text> ProgressBar</Text>
      <Box
        textAlign={"center"}
        mx={"auto"}
        w="50%"
        bg="gray.200"
        borderRadius={"xl"}
        mt="20px"
      >
        <Box h="20px" bg="blue.500" borderRadius={"xl"} w={`${percentage}%`}>
          <Text color={percentage > 50 ? "#fff" : "black"}>{value}%</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressBar;
