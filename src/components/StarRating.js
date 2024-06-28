import React, { useState } from "react";
import { Text, Box, Button } from "@chakra-ui/react";
import { RiStarSFill } from "react-icons/ri";
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log(hover);
  return (
    <Box display={"flex"} flexDir={"column"} gap={2} justifyContent={"center"}>
      <Text fontWeight={"bold"} fontSize={"4xl"}>
        Rating
      </Text>
      <Box display={"flex"} flexDir={"row"} justifyContent={"center"} gap={4}>
        {[1, 2, 3, 4, 5].map((num, index) => (
          <Button
            variant={"ghost"}
            key={index}
            cursor={"pointer"}
            onClick={() => setRating(num)}
            onMouseOver={() => setHover(num)}
            onMouseLeave={() => {
              setHover(rating);
            }}
            _hover={{ color: "black" }}
            color={num <= ((rating && hover) || hover) ? "black" : "gray"}
          >
            <RiStarSFill fontSize={"40px"} />
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default StarRating;
