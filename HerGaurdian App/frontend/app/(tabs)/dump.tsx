import React, { useState, useEffect } from "react";
import { View, Text, Button, Share } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request permission and get the user's location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const shareLocation = async () => {
    if (!location) {
      alert("Location not available yet");
      return;
    }

    const { latitude, longitude } = location.coords;

    // Create a Google Maps link with the user's latitude and longitude
    const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    try {
      // Use the Share API to share the location link
      await Share.share({
        message: `Check out my live location: ${locationLink}`,
        url: locationLink,
        title: "My Live Location",
      });
    } catch (error) {
      alert("Error sharing location");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Live Location Sharing</Text>
      {location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude:{" "}
          {location.coords.longitude}
        </Text>
      ) : (
        <Text>Loading location...</Text>
      )}
      <Button title="Share My Location" onPress={shareLocation} />
    </View>
  );
}