import React, { useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const Emical = () => {
  const [principle, setPrinciple] = useState(0);
  const [intrest, setIntrest] = useState(0);
  const [year, setYear] = useState(0);
  const [emivalue, setEmiValue] = useState(0);
  const handleOnChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === "principle") {
      setPrinciple(value);
    }
    if (id === "intrest") {
      setIntrest(value);
    }
    if (id === "year") {
      setYear(value);
    }
  };
  //  P (r(1+r)^n/((1+r)^n)-1)
  const calEmi = () => {
    let r = intrest;
    let p = principle;
    let n = year;
    if (p && r && n) {
      r = r / 12 / 100; //divided per month
      const calPow = Math.pow(1 + r, n * 12);
      const calAmt = p * ((r * calPow) / (calPow - 1));
      setEmiValue(Math.round(calAmt));
    }
  };
  useEffect(() => {
    calEmi();
  }, [principle, intrest, year]);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      background={"blue.400"}
      height={"100vh"}
      width={"100%"}
      py={"4%"}
    >
      <VStack
        padding={"4%"}
        background={"#fff"}
        boxShadow={"md"}
        justifyContent={"center"}
      >
        <Text fontSize={"3xl"}>Mortage Calulator</Text>
        <FormControl>
          <FormLabel>Principle</FormLabel>
          <Input
            size={"lg"}
            boxShadow={"md"}
            type="number"
            variant={"fill"}
            placeholder="principle"
            border={"1px solid blue"}
            id="principle"
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Intrest</FormLabel>
          <Input
            size={"lg"}
            boxShadow={"md"}
            type="number"
            variant={"fill"}
            placeholder="intrest"
            border={"1px solid blue"}
            id="intrest"
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Year</FormLabel>
          <Input
            size={"lg"}
            boxShadow={"md"}
            type="number"
            variant={"fill"}
            placeholder="year"
            border={"1px solid blue"}
            id="year"
            onChange={handleOnChange}
          />
        </FormControl>
        <Text fontSize={"xl"}>{`Your emi value is ${emivalue}`} </Text>
      </VStack>
    </Box>
  );
};

export default Emical;
