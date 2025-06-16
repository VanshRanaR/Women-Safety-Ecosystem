import React, { useState } from "react";
import Constants from "expo-constants";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";


const GOOGLE_API_KEY = Constants.expoConfig?.extra?.API_KEY;
const API_URL = "https://herguardian.onrender.com/api/crime/report";

export default function ReportIncidentScreen() {
  const [selectedIncident, setSelectedIncident] = useState("");
  const [evidenceImage, setEvidenceImage] = useState(null);
  const [location, setLocation] = useState("");
  const router = useRouter();

  const incidentTypes = ["Harassment", "Stalking", "Assault", "Other"];

  const handleSelectImageFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setEvidenceImage(result.assets[0].uri);
    }
  };

  const handleOpenCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setEvidenceImage(result.assets[0].uri);
    }
  };

  // Function to fetch latitude and longitude based on the location
  const fetchLatLong = async (place) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${GOOGLE_API_KEY}`
      );

      if (response.data.results.length === 0) {
        Alert.alert("Location not found");
        return null;
      }

      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error fetching location");
      return null;
    }
  };

  // Function to handle report submission
  const handleSubmitReport = async () => {
    if (!location) {
      Alert.alert("Please enter a location.");
      return;
    }

    const locationData = await fetchLatLong(location);
    if (!locationData) return;

    const payload = {
      area: location, // 👈 match backend key
      lat: locationData.lat, // 👈 match backend key
      lng: locationData.lng, // 👈 match backend key
    };

    try {
      const response = await fetch("https://herguardian.onrender.com/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unknown error");

      Alert.alert("Report Submitted", data.message || "Success");
      setLocation("");
      router.push("/report_submission");
    } catch (error) {
      console.error("Error submitting report:", error);
      Alert.alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleReport}>Report</Text>
            <Text style={styles.titleIncident}>An Incident</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Image
            source={require("../../assets/image/report_main.png")}
            style={styles.heroImage}
          />

          {/* Location Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="location-on" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Enter location"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Incident Type Selection */}
          <View style={styles.incidentTypesContainer}>
            {incidentTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.incidentTag,
                  selectedIncident === type && styles.selectedTag,
                ]}
                onPress={() => setSelectedIncident(type)}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedIncident === type && styles.selectedTagText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Upload Evidence Section */}
          <View style={styles.uploadBox}>
            {/* <Pressable
              onPress={handleSelectImageFromGallery}
              style={styles.evidenceButton}
            > */}
            <Text style={styles.uploadButtonText}>
              Upload evidence (optional)
            </Text>
            {/* </Pressable> */}
            <Pressable onPress={handleOpenCamera} style={styles.cameraButton}>
              <Feather name="camera" size={30} color="white" />
            </Pressable>
          </View>

          {/* Display selected image */}
          {evidenceImage && (
            <Image
              source={{ uri: evidenceImage }}
              style={styles.evidencePreview}
            />
          )}

          {/* Submit Report Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitReport}
          >
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  scrollContent: { flexGrow: 1, paddingBottom: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 4 },
  titleContainer: { flexDirection: "row", marginLeft: 12, gap: 4 },
  titleReport: { fontSize: 20, fontWeight: "bold", color: "#FF0000" },
  titleIncident: { fontSize: 20, fontWeight: "bold" },
  content: { flex: 1 },
  evidenceButton: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  input: { flex: 1, fontSize: 18, marginLeft: 10 },
  incidentTypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  incidentTag: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    margin: 4,
  },
  selectedTag: { backgroundColor: "#FF0000" },
  tagText: { fontSize: 14, fontWeight: "bold" },
  selectedTagText: { color: "#fff" },
  uploadBox: {
    flexDirection: "row",
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: "grey",
    width: "15%",
    padding: 10,
    borderRadius: 8,
  },
  uploadButtonText: {
    width: "85%",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 8,
  },
  evidencePreview: {
    width: "100%",
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
  heroImage: {
    width: "100%",
    height: "40%",
    marginTop: 16,
    borderRadius: 8,
  },
  submitButton: { backgroundColor: "#FF0000", padding: 16, borderRadius: 8 },
  submitButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
