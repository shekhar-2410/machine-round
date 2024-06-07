import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
const formData = [
  {
    id: "name",
    lable: "Name",
    type: "text",
    btn_label: "next",
    placeHolder: "Enter your name",
  },
  {
    id: "email",
    lable: "Email",
    type: "email",
    btn_label: "next",
    placeHolder: "Enter your email",
  },
  {
    id: "phonenumber",
    lable: "phone number",
    type: "phone",
    btn_label: "next",
    placeHolder: "Enter your phone number",
  },
  {
    id: "city",
    lable: "City",
    type: "text",
    btn_label: "next",
    placeHolder: "Enter your city",
  },
  {
    id: "pincode",
    lable: "Pin code",
    type: "number",
    btn_label: "submit",
    placeHolder: "Enter your pin code",
  },
];
const MultitepForm = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(formData);
  const [form_Data, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    city: "",
    pincode: "",
  });
  const[showbox,setshowbox]=useState(false)
  const eventHandler = (e) => {
    e.preventDefault();
    if (index === data.length - 1) {
      setshowbox(true);
    } else {
      setIndex((i) => i + 1);
    }
  };
  const prevPage = (e) => {
    e.preventDefault();
    setIndex((i) => i - 1);
  };
  const handleOnChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const copyformData = { ...form_Data };
    copyformData[id] = value;
    setFormData(copyformData);
  };

  return (
    <Box>
      <Text textAlign={"center"} fontSize={"3xl"}>
        Multi Step Form
      </Text>
      {showbox === false?( <Box
        background={"purple"}
        padding={"20px"}
        width={"fit-content"}
        mx={"auto"}
        mt={"20px"}
        boxShadow={"md"}
      >
        {index !== 0 && (
          <Button
            color="#fff"
            leftIcon={<ArrowLeftIcon />}
            variant={"ghost"}
            ml="-90%"
            onClick={prevPage}
            _hover={{ background: "transparent", color: "#fff" }}
          >
            back
          </Button>
        )}
        <form onSubmit={eventHandler}>
          <FormControl mb="10px">
            <FormLabel color="#fff" textAlign={"center"}>
              {data[index].lable}
            </FormLabel>
            <Input
              placeholder={data[index].placeHolder}
              color="#fff"
              width={"md"}
              type={data[index].type}
              required
              id={data[index].id}
              onChange={handleOnChange}
              value={form_Data[data[index].id]}
            />
          </FormControl>
          <Button type="submit" textTransform={"uppercase"}>
            {data[index].btn_label}
          </Button>
        </form>
      </Box>):(
        <VStack>
            <Text fontWeight={"bold"} fontSize={"xl"}>Succesfully Submitted !</Text>
           
            <Text>Name: {form_Data.name}</Text>
            <Text>Eamil: {form_Data.email}</Text>
            <Text>Phone-number: {form_Data.phonenumber}</Text>
            <Text>City: {form_Data.city}</Text>
            <Text>PineCode: {form_Data.pincode}</Text>
            <Button onClick={() => setshowbox(false)}>Go Back</Button>
        </VStack>
      )
      }
     
    </Box>
  );
};

export default MultitepForm;
