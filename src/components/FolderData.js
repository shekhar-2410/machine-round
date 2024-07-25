import React, { useState } from "react";
import { Box, Button, HStack, Text, VStack, Input } from "@chakra-ui/react";
import { FcOpenedFolder, FcFolder } from "react-icons/fc";
import { TbNotes } from "react-icons/tb";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
const FolderData = ({ explorer }) => {
  const [expan, setExpan] = useState(false);
  const [showinput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const switchExpan = () => {
    setExpan(!expan) 
    };
  const stopPropogation = (e) => {
    e.stopPropagation();
  };
  const onInput = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setShowInput({
        ...showinput,
        visible: false,
      });
    }
  };
  return (
    <Box mt={"2%"}>
      {explorer?.isFolder === true ? (
        <VStack>
          <HStack
            background={"gray.100"}
            width={"30%"}
            onClick={switchExpan}
            cursor={"pointer"}
            padding={"10px"}
            boxShadow={"md"}
          >
            {expan ? <FcOpenedFolder size="30px" /> : <FcFolder size="30px" />}
            <Text>{explorer.name}</Text>
            <Box ml={"auto"}>
              <Button
                onClick={(e) => {
                  switchExpan();
                  stopPropogation(e, true);
                  setShowInput({
                    visible: true,
                    isFolder: true,
                  });
                }}
                ml={"10px"}
                background={"yellow.300"}
              >
                Folder +
              </Button>
              <Button
                onClick={(e) => {
                  stopPropogation(e, false);
                  setShowInput({
                    visible: true,
                    isFolder: false,
                  });
                  switchExpan();
                }}
                ml={"10px"}
                background={"yellow.300"}
              >
                File +
              </Button>
            </Box>
          </HStack>
          <Box>
            {showinput.visible && (
              <Box>
                {showinput.isFolder === true ? (
                  <HStack>
                    <FcFolder size="30px" />
                    <Input
                      onKeyDown={onInput}
                      onBlur={() => setShowInput({ ...showinput, visible: false })}
                      autoFocus
                      border={"1px solid gray"}
                    />
                  </HStack>
                ) : (
                  <HStack>
                    <TbNotes size="30px" />
                    <Input
                      onKeyDown={onInput}
                      onBlur={() => setShowInput({ ...showinput, visible: false })}
                      autoFocus
                      border={"1px solid gray"}
                    />
                  </HStack>
                )}
              </Box>
            )}
          </Box>
          {expan &&
            explorer?.items?.map((item) => {
              return (
                <Box key={item.id} width={"90%"}>
                  <FolderData key={item.id} explorer={item} />
                </Box>
              );
            })}
        </VStack>
      ) : (
        <HStack ml={"37%"} background={"none"}>
          <TbNotes />
          <Text color={"gray.500"}>{explorer.name}</Text>
        </HStack>
      )}
    </Box>
  );
};

export default FolderData;
