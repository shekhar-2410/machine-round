import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Slider = () => {
  const [api, setApi] = useState([]);
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((i) => i + 1);
  };
  const prevImage = () => {
    setIndex((i) => i - 1);
  };
  const image = api?.photos?.map((item) => {
    return item.url;
  });
  const lastIndex = image?.length - 1;
 
  const baseUrl =
    "https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20";
  const getImage = async () => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setApi(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <Box width={"100%"} my={"5%"}>
      <HStack>
        {index === 0 ? (
          <Button
            width={"3%"}
            height={"40px"}
            background={"yellow.300"}
            borderRadius={"10px"}
            boxShadow={"md"}
            onClick={prevImage}
            isDisabled={index === 0}
          >
            <ArrowLeftIcon mt={"5px"} />
          </Button>
        ) : (
          <Button
            width={"3%"}
            height={"40px"}
            background={"yellow.300"}
            borderRadius={"10px"}
            boxShadow={"md"}
            onClick={prevImage}
          >
            <ArrowLeftIcon mt={"5px"} />
          </Button>
        )}

        <Box mx={"auto"} width={"90%"} background={"yellow.300"}>
          {image && image.length > 0 ? (
            <Image
              mx={"auto"}
              height={"fit-content"}
              width={"fit-content"}
              src={image[index]}
              alt="Image not found"
            />
          ) : (
            <Box>No image available</Box>
          )}
        </Box>
        {index === lastIndex ? (
          <Button
            width={"3%"}
            height={"40px"}
            background={"yellow.300"}
            borderRadius={"10px"}
            boxShadow={"md"}
            onClick={nextImage}
            isDisabled={index === lastIndex}
          >
            <ArrowRightIcon mt={"5px"} />
          </Button>
        ) : (
          <Button
            width={"3%"}
            height={"40px"}
            background={"yellow.300"}
            borderRadius={"10px"}
            boxShadow={"md"}
            onClick={nextImage}
          >
            <ArrowRightIcon mt={"5px"} />
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default Slider;
