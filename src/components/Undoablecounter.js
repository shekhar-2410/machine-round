import React, { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
const Undoablecounter = () => {
  const [integer, setInteger] = useState(0);
  const [history, setHistory] = useState([]);
  console.log(history);
  const [redoList, setRedolist] = useState([]);
  console.log(redoList.length - 1);
  const maintainHistory = (key, prev, curr) => {
    const obj = {
      action: key,
      prev,
      curr,
    };
    const copuHistory = [...history];
    copuHistory.unshift(obj);
    setHistory(copuHistory);
  };

  const handleUndo = () => {
    const copyHist = [...history];
    const firstItem = copyHist.shift();
    setHistory(copyHist);

    const copyRedolist = [...redoList];
    copyRedolist.push(firstItem);
    setRedolist(copyRedolist);
    setInteger(firstItem.prev);
  };
  const handleChange = (key) => {
    const val = parseInt(key);
    setInteger((prev) => prev + val);
    maintainHistory(key, integer, val + integer);
  };
  const handleRedo = () => {
    if (redoList.length) {
      const copRedoHistory = [...redoList];
      setRedolist(copRedoHistory);
      const popValue = copRedoHistory.pop();
      const { action, prev, curr } = popValue;
      setInteger(curr);
      maintainHistory(action, prev, curr);
    }
  };
  return (
    <Box
      py={"20px"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
    >
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Undoablecounter
      </Text>
      <HStack mt={"20px"} justify={"center"} spacing={"10px"}>
        <Button onClick={handleUndo} bg={"purple"} color={"#fff"}>
          Undo
        </Button>
        <Button onClick={handleRedo} bg={"purple"} color={"#fff"}>
          Redo
        </Button>
      </HStack>
      <HStack mt={"20px"} justify={"center"} spacing={"10px"}>
        {[-100, -10, -1].map((item, id) => (
          <Button
            onClick={() => handleChange(item)}
            key={id}
            bg={"purple"}
            color={"#fff"}
          >
            {item}
          </Button>
        ))}
        <Text>{integer}</Text>
        {["+100", "+10", "+1"].map((item, id) => (
          <Button
            onClick={() => handleChange(item)}
            key={id}
            bg={"purple"}
            color={"#fff"}
          >
            {item}
          </Button>
        ))}
      </HStack>
      <Box
        mx={"auto"}
        width={"440px"}
        boxShadow={"md"}
        p={"10px"}
        mt={"20px"}
        background={"gray.100"}
      >
        {history.map((hisobj, id) => (
          <HStack
            key={id}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"lg"}>Action:{hisobj.action}</Text>
            <Text
              fontSize={"lg"}
            >{`Previous: ${hisobj.prev}--> Current: ${hisobj.curr}`}</Text>
          </HStack>
        ))}
      </Box>
    </Box>
  );
};

export default Undoablecounter;
