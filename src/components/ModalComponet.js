/* eslint-disable react/jsx-no-undef */
import { Button, Box, VStack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

const ModalComponent = () => {
  const [showbox, setShowbox] = useState(false);
  const [offerbox, setOfferbox] = useState(false);
  const [showbutton, setShowbutton] = useState(true);

  const openBox = () => {
    setShowbox(!showbox);
  };

  const closeBox = () => {
    setShowbox(false);
  };

  const openOffer = () => {
    setOfferbox(!offerbox);
    setShowbox(false);
    setShowbutton(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal") {
      setShowbox(false);
    }
  };

  const handleOutsideClick2 = (e) => {
    if (e.target.id === "offer-box") {
      setOfferbox(false);
      setShowbutton(true);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      py={"10%"}
    >
      {showbutton && <Button onClick={openBox}>Show offer</Button>}

      {showbox && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(6px)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000"
          onClick={handleOutsideClick}
          id="modal"
        >
          <Box
            width={"fit-content"}
            padding={"2%"}
            background={"gray.400"}
            border="1px solid gray"
            borderRadius={"10px"}
            position="relative"
          >
            <VStack>
              <Box
                ml={"auto"}
                background={"gray.100"}
                padding={"1%"}
                borderRadius={"10px"}
                textAlign={"center"}
                onClick={closeBox}
                cursor={"pointer"}
              >
                <CloseIcon />
              </Box>
              <Text color="#fff">
                Click the button below to accept the amazing offer!
              </Text>
              <Button onClick={openOffer}>Accept the offer</Button>
            </VStack>
          </Box>
        </Box>
      )}

      {offerbox && (
        <Box
          width={"fit-content"}
          padding={"2%"}
          background={"gray.400"}
          border="1px solid gray"
          borderRadius={"10px"}
          id="offer-box"
          onClick={handleOutsideClick2}
          cursor={"pointer"}
        >
          <VStack>
            <Text color="#fff">Offer accepted!</Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default ModalComponent;
