import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const Two_StepVerification = () => {
  const emptyArray = ["", "", "", ""];
  const ref = [useRef(), useRef(), useRef(), useRef()];
  const [input, setInput] = useState(emptyArray);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(parseInt(value))) return;
    if (value.length === 1 && index < 3) {
      ref[index + 1].current.focus();
    }
    const copyInput = [...input];
    copyInput[index] = value;
    setInput(copyInput);
  };
  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && index > 0) {
      ref[index - 1].current.focus();
    }
    const copyInput = [...input];
    copyInput[index] = "";
    setInput(copyInput);
  };
  const pasteHandler = (e) => {
    const data = e.clipboardData.getData("text");

    if (!Number(data) || data.length !== input.length) return;
    const patsecode = data.split("");

    setInput(patsecode);

    ref[patsecode.length - 1].current.focus();
  };

  useEffect(() => {
    ref[0].current.focus();
  }, []);
  return (
    <Box>
      <Text my={"10px"} fontSize={"2xl"}>
        Two Step Verification
      </Text>
      <HStack justify={"center"}>
        {emptyArray.map((item, index) => {
          return (
            <Input
              value={input[index]}
              ref={ref[index]}
              boxShadow={"md"}
              textAlign={"center"}
              key={index}
              width={"50px"}
              type="text"
              maxLength={1}
              _focus={{ outline: "blue" }}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => {
                handleKeyDown(e, index);
              }}
              onPaste={(e) => pasteHandler(e)}
              required
            />
          );
        })}
      </HStack>
      <Button marginTop={"10px"}>Submit</Button>
    </Box>
  );
};

export default Two_StepVerification;
