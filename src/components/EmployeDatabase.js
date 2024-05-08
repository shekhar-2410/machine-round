import {
  Box,
  HStack,
  Text,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spacer,
  VStack,
  Image,
  IconButton,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SmallAddIcon, CloseIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
const EmployeDatabase = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [api, setApi] = useState([]);
  const [employee, setEmployee] = useState({});
  const [array, setArray] = useState({});

  // add employe data in existing data
  const modifiedData = [...api];
  if (array.value !== null) {
    modifiedData.push(array);
  }
  console.log(modifiedData);
  // softdele existing data
  const softDelete = (id) => {
    setApi((prevApi) => prevApi.filter((item) => item.id !== id)) 
  };

  const fetchApi = async () => {
    try {
      const eplapi = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await eplapi.json();
      setApi(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <Box px={"40px"}>
      <HStack justifyContent={"spacebetween"} marginTop={"20px"}>
        <Box>
          <Text fontSize={"24px"} fontWeight={"bold"}>
            Employee Database Managemnet
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Button
            color={"#fff"}
            fontSize={"16px"}
            background={"gray.700"}
            leftIcon={<SmallAddIcon />}
            onClick={onOpen}
          >
            Add Employee
          </Button>

          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add employee details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Formik
                  initialValues={{
                    id: Math.floor(Math.random() * 100),
                    name: "",
                    username: "",
                    email: "",
                    address: "",
                    phone: "",
                    website: "",
                  }}
                  onSubmit={(values) => {
                    setArray((prev) => ({ ...prev, ...values }));
                  }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        my={"4px"}
                      />

                      <Input
                        type="text"
                        name="address"
                        placeholder="address"
                        value={values.address}
                        onChange={handleChange}
                        my={"4px"}
                      />

                      <Input
                        type="tel"
                        name="phone"
                        placeholder="phone"
                        value={values.phone}
                        onChange={handleChange}
                        my={"4px"}
                      />

                      <Input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={values.email}
                        onChange={handleChange}
                        my={"4px"}
                      />

                      <Button mt={4} type="submit">
                        Submit
                      </Button>
                    </form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </HStack>
      <HStack mt={"10px"}>
        <Box
          border={"1px solid "}
          borderColor={"gray.500"}
          height={"400px"}
          width={"40%"}
          overflowY="auto"
        >
          <Text py="8px" my="4px">
            Employee List
          </Text>
          <hr />
          {modifiedData?.map((data) => {
            if (data.name) {
              return (
                <Box
                  key={data.id}
                  background="gray.50"
                  boxShadow="lg"
                  width="500px"
                  height="50px"
                  padding="5px"
                  margin="8px"
                  border={"1px solid "}
                  borderColor={"red.100"}
                >
                  <HStack>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEmployee(data);
                      }}
                    >
                      {data.name}
                    </Text>
                    <Spacer />
                    <IconButton
                      aria-label="Add to friends"
                      icon={<CloseIcon />}
                      onClick={() => softDelete(data.id)}
                    />
                  </HStack>
                </Box>
              );
            } else {
              return null;
            }
          })}
        </Box>
        <Box
          border={"1px solid "}
          borderColor={"gray.500"}
          height={"400px"}
          width={"60%"}
          overflowY="auto"
        >
          <Text py="8px" my="4px">
            Employee Information
          </Text>
          <hr />
          <VStack>
            <Box height="100px" width="100px" mt="10px">
              <Image
                boxShadow="md"
                borderRadius="full"
                src="https://clipground.com/images/placeholder-clipart-5.jpg"
                alt="Dan Abramov"
              />
            </Box>
            <Text fontSize={"18px"} fontWeight="bold">
              {employee.name || "Employee Name"}
            </Text>
            <Text fontSize={"18px"} fontWeight="bold">
              Address: {employee?.address?.street || employee?.address},
              {employee?.address?.suite},{employee?.address?.city}
              {employee?.address?.zipcode}
            </Text>
            <Text fontSize={"18px"} fontWeight="bold">
              Phone:{employee.phone || "XXXXXXXXX"}
            </Text>
            <Text fontSize={"18px"} fontWeight="bold">
              Email:{employee.email || "abc@d.com"}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default EmployeDatabase;
