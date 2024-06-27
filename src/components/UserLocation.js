import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { FormLabel, HStack, Input, Box, Text } from "@chakra-ui/react";
const createCustomIcon = (icon) => {
  return L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(icon),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Custom Marker component using react-icons
const CustomMarker = ({ position }) => {
  const icon = createCustomIcon(<FaMapMarkerAlt size={32} color="red" />);
  return <Marker position={position} icon={icon} />;
};
const AddressForm = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [errors, setError] = useState("");

  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const success = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLocation({ latitude, longitude });

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=14230fe974a64bbea20d5f966f9d787d`
      );
      const data = await response.json();
      console.log("data", data);
      if (data.results.length > 0) {
        const { components } = data.results[0];
        setAddress({
          street: components.road || "",
          city: components.city || "",
          state: components.state || "",
          zip: components.postcode || "",
          country: components.country || "",
        });
      } else {
        setError("Unable to retrieve address.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setError("Error retrieving address. Please try again later.");
    }
  };

  const error = () => {
    setError("Unable to retrieve your location.");
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box padding={"2%"}>
      <Text fontSize={"2xl"}>Current Address</Text>
      <HStack spacing={4}>
        <Box width={"50%"}>
          {errors && <p>{errors}</p>}
          <form>
            <FormLabel>Street</FormLabel>
            <Input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Street"
            />
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
            />
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
            />
            <FormLabel>Zip Code</FormLabel>
            <Input
              type="text"
              name="zip"
              value={address.zip}
              onChange={handleChange}
              placeholder="Zip Code"
            />
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </form>
        </Box>
        <Box width={"50%"}>
          {currentLocation.latitude && currentLocation.longitude ? (
            <MapContainer
              center={[currentLocation.latitude, currentLocation.longitude]}
              zoom={15}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <CustomMarker
                position={[currentLocation.latitude, currentLocation.longitude]}
              />
            </MapContainer>
          ) : (
            "Loading..."
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default AddressForm;
