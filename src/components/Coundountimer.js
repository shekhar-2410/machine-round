import React, { useState, useEffect } from "react";
import { Box, VStack, Text, Input, HStack, Button } from "@chakra-ui/react";

const CountdownTimer = () => {
  const [isStart, setisStart] = useState(false);
  const [isPause, setisPausse] = useState(false);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timerid, setTimerid] = useState(0);

  const eventHandler = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    }
    if (id === "min") {
      setMin(value);
    }
    if (id === "sec") {
      setSec(value);
    }
  };
  const onClick = () => {
    if (hours > 0 || min > 0 || sec > 0) {
      setisStart(true);
    } else {
      alert("please set the timer");
    }
  };

  const runTime = (sec, min, hrs, tid) => {
    if (sec > 0) {
      setSec((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMin((m) => m - 1);
      setSec(59);
    } else {
      setHours((h) => h - 1);
      setMin(59);
      setSec(59);
    }
    if (sec === 0 && min === 0 && hrs === 0) {
      setSec(0);
      setMin(0);
      setHours(0);
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTime(sec, min, hours, tid);
      }, 1000);
      setTimerid(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, min, sec]);

  const restartTimer = () => {
    setisStart(false);
    setHours(0);
    setMin(0);
    setSec(0);
    clearInterval(timerid);
  };
  const pauseTimer = () => {
    setisPausse(true);
    clearInterval(timerid);
  };
  const resumeTimer = () => {
    setisPausse(false);
    runTime(sec, min, hours);
  };
  return (
    <Box background={"teal"} width={"100%"} height={"100vh"} py={10}>
      <VStack justify={"center"}>
        <Text color={"#fff"} fontSize={"3xl"}>
          CountDown
        </Text>
        {!isStart && (
          <Box>
            <HStack textAlign={"center"}>
              <Input
                type="number"
                color={"#fff"}
                height={70}
                width={70}
                placeholder="HH"
                textAlign={"center"}
                id="hours"
                onChange={eventHandler}
              />
              <Input
                type="number"
                color={"#fff"}
                height={70}
                width={70}
                placeholder="MM"
                textAlign={"center"}
                id="min"
                onChange={eventHandler}
              />
              <Input
                type="number"
                color={"#fff"}
                height={70}
                width={70}
                placeholder="SS"
                textAlign={"center"}
                id="sec"
                onChange={eventHandler}
              />
            </HStack>

            <Button onClick={onClick} mt="10">
              Start
            </Button>
          </Box>
        )}
        {isStart && (
          <Box>
            <HStack
              spacing={"30px"}
              color={"#fff"}
              textAlign={"center"}
              mb={"10%"}
              ml={"-50%"}
            >
              <Box
                border={"1px solid white"}
                borderRadius={"sm"}
                padding={"10%"}
                background={"yellow.400"}
                boxShadow={"md"}
              >
                <Text fontSize={"3xl"} fontWeight={"bold"}>
                  {hours < 10 ? "0" + hours : hours}
                </Text>
              </Box>
              <Box
                border={"1px solid white"}
                borderRadius={"sm"}
                padding={"10%"}
                background={"yellow.400"}
                boxShadow={"md"}
              >
                <Text fontSize={"3xl"} fontWeight={"bold"}>
                  {min < 10 ? "0" + min : min}
                </Text>
              </Box>
              <Box
                border={"1px solid white"}
                borderRadius={"sm"}
                padding={"10%"}
                background={"yellow.400"}
                boxShadow={"md"}
              >
                <Text fontSize={"3xl"} fontWeight={"bold"}>
                  {sec < 10 ? "0" + sec : sec}
                </Text>
              </Box>
            </HStack>
            <HStack>
              {!isPause && (
                <Button size="md" width={"100px"} onClick={pauseTimer}>
                  Pause
                </Button>
              )}
              {isPause && (
                <Button size="md" width={"100px"} onClick={resumeTimer}>
                  Resume
                </Button>
              )}

              <Button onClick={restartTimer}>Restart</Button>
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CountdownTimer;
