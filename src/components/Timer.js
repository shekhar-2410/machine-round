import React, { useState, useEffect, useRef } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const timer = useRef(null);

  const incrementSec = (prevSec) => {
    if (prevSec === 59) {
      incrementMin();
      return 0;
    }
    return prevSec + 1;
  };

  const incrementMin = () => {
    setMin((prevMin) => {
      if (prevMin === 59) {
        incrementHrs();
        return 0;
      }
      return prevMin + 1;
    });
  };

  const incrementHrs = () => {
    setHours((preHrs) => preHrs + 1);
  };
  const startTimer = () => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      setSec(incrementSec);
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const restartTimer = () => {
    stopTimer();
    setSec(0);
    setMin(0);
    setHours(0);
    startTimer();
  };

  useEffect(() => {
    // Clean up the interval on component unmount
    return () => stopTimer();
  }, []);

  return (
    <Box>
      <Text fontSize={"3xl"} textAlign={"center"}>
        Timer
      </Text>
      <HStack justify={"center"} spacing={"10px"}>
        <Box
          width={"100px"}
          height={"50px"}
          background={"#fff"}
          boxShadow={"md"}
          padding={2}
          textAlign={"center"}
        >
          <Text color={"blue.800"} fontWeight={"bold"} fontSize={"xl"}>
            Hrs:{hours < 10 ? "0" + hours : hours}
          </Text>
        </Box>
        <Box
          width={"100px"}
          height={"50px"}
          background={"#fff"}
          boxShadow={"md"}
          padding={2}
          textAlign={"center"}
        >
          <Text color={"red.700"} fontWeight={"bold"} fontSize={"xl"}>
            Min:{min < 10 ? "0" + min : min}
          </Text>
        </Box>
        <Box
          width={"100px"}
          height={"50px"}
          background={"#fff"}
          boxShadow={"md"}
          padding={2}
          textAlign={"center"}
        >
          <Text color={"green.700"} fontWeight={"bold"} fontSize={"xl"}>
            Sec:{sec < 10 ? "0" + sec : sec}
          </Text>
        </Box>
      </HStack>
      <HStack justify={"center"} spacing={"10px"} mt={"10px"}>
        <Button
          shadow={"md"}
          colorScheme="teal"
          variant="outline"
          onClick={restartTimer}
        >
          Restart
        </Button>
        <Button
          onClick={stopTimer}
          shadow={"md"}
          colorScheme="red"
          variant="outline"
        >
          Stop
        </Button>
        <Button
          shadow={"md"}
          colorScheme="teal"
          variant="outline"
          onClick={startTimer}
        >
          Start
        </Button>
      </HStack>
    </Box>
  );
};
export default Timer;
