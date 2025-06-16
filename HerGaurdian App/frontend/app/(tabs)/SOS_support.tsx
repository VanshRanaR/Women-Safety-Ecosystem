import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Linking,
  Button,
  Switch,
  Share,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { Accelerometer } from "expo-sensors";

import { useRouter } from "expo-router";
import call from "react-native-phone-call";
const THRESHOLD = 3;
export default function SOSScreen() {
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
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
      const locationLink = `I,m in danger.Please call the police. my location: https://www.google.com/maps?q=${latitude},${longitude}`;
  
      try {
        // Use the Share API to share the location link
        const url = `sms:${phoneNumber}?body=${encodeURIComponent(locationLink)}`;
        Linking.openURL(url).catch((err) =>
          console.error("Error sending SMS", err)
        );
        Alert.alert("Shake Detected", customMessage);
      } catch (error) {
        alert("Error sharing location");
      }
    };
  const [shakeEnabled, setShakeEnabled] = useState(false); // Toggle shake detection
  const [customMessage, setCustomMessage] = useState(
    "Help! This is my location."
  );

  useEffect(() => {
    let subscription;

    // If shake detection is enabled, start listening for accelerometer updates
    if (shakeEnabled) {
      subscription = Accelerometer.addListener(({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        if (acceleration > THRESHOLD) {
          handleShakeDetected();
        }
      });
      Accelerometer.setUpdateInterval(200); // Update interval (in milliseconds)
    }

    // Clean up the subscription when disabled
    return () => {
      if (subscription) subscription.remove();
    };
  }, [shakeEnabled]);
  const handleShakeDetected = () => {
    shareLocation();
    // Customize the message and the action after shaking is detected
    
    // Here you can add code to send the location and message via SMS or API.
  };
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: "Mom",
      phone: "+91 6370947476",
      isEditing: false, // Add editing state for each contact
    },
    {
      id: 2,
      name: "Dad",
      phone: "+91 6370947476",
      isEditing: false, // Add editing state for each contact
    },
  ]);
  //cumm
  const phoneNumber = emergencyContacts[0].phone;

  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [showInputFields, setShowInputFields] = useState(false);

  const [presetMessages, setPresetMessages] = useState([
    "I'm in danger. Please call the police.",
    "I'm in danger. Please help me.",
  ]);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customMessage1, setCustomMessage1] = useState(presetMessages[0]);
  const [customMessage2, setCustomMessage2] = useState(presetMessages[1]);

  const handleAddContact = () => {
    if (nameInput.trim() === "" || phoneInput.trim() === "") {
      Alert.alert("Error", "Please enter both name and phone number");
      return;
    }

    const newContact = {
      id: emergencyContacts.length + 1,
      name: nameInput,
      phone: phoneInput,
      isEditing: false,
    };

    setEmergencyContacts([...emergencyContacts, newContact]);
    setNameInput("");
    setPhoneInput("");
    setShowInputFields(false);
  };

  const handleEditContact = (contactId) => {
    setEmergencyContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, isEditing: !contact.isEditing } // Toggle editing state
          : contact
      )
    );
  };

  // Function to handle removing a contact
  const handleRemoveContact = (contactId) => {
    setEmergencyContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  // Function to place a call
  const handleCall = (phoneNumber) => {
    const callArgs = {
      number: phoneNumber, // String value with the number to call
      prompt: true, // Set `true` to show the native phone call prompt
    };

    call(callArgs).catch(console.error);
  };

  // Function to handle the "Customize your message" button
  const handleSaveCustomMessages = () => {
    setPresetMessages([customMessage1, customMessage2]);
    setIsCustomizing(false); // Hide customization fields after saving
  };

  const sendEmergencyMessages = () => {
    const message = "I'm in danger. Please help me.";
    emergencyContacts.forEach((contact) => {
      console.log(
        `Sending message to ${contact.name} (${contact.phone}): ${message}`
      );
    });
  };

  const handleActivateAlarm = () => {
    sendEmergencyMessages();
    router.push("/alarm");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="black" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.titleSOS}>SOS</Text>
          <Text style={styles.titleSupport}>SUPPORT</Text>
          <Ionicons name="alarm" size={24} color="red" />
        </View>
        <TouchableOpacity style={styles.infoButton}>
          <Feather name="info" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.slider}>
        <Text style={styles.text}>
          Shake Detection: {shakeEnabled ? "On" : "Off"}
        </Text>

        <Switch
          value={shakeEnabled}
          onValueChange={setShakeEnabled}
          style={styles.switch}
        />
      </View>
      <View style={styles.alarmSection}>
        <Text style={styles.alarmTitle}>Activate loud alarm</Text>
        <Text style={styles.alarmSubtitle}>
          Hold down for 3 seconds to activate a loud alarm
        </Text>
        <Pressable
          onPress={handleActivateAlarm} // Trigger alarm and navigate
          style={[styles.alarmButton, isPressed && styles.alarmButtonPressed]}
        >
          <Text style={styles.alarmButtonText}>Activate Alarm</Text>
        </Pressable>
      </View>
      <View style={styles.contactsSection}>
        <View style={styles.contactsHeader}>
          <Text style={styles.contactsTitle}>Emergency Contacts</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowInputFields(!showInputFields)}
          >
            <Text style={styles.addButtonText}>
              {showInputFields ? "Cancel" : "Add Contacts"}
            </Text>
          </TouchableOpacity>
        </View>

        {showInputFields && (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter name"
              value={nameInput}
              onChangeText={setNameInput}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter phone number"
              value={phoneInput}
              onChangeText={setPhoneInput}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={handleAddContact}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Save Contact</Text>
            </TouchableOpacity>
          </View>
        )}

        {emergencyContacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <View style={styles.avatarPlaceholder}>
                <Feather name="user" size={20} color="gray" />
              </View>
              <View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
            </View>
            <View style={styles.contactActions}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(contact.phone)}
              >
                <Feather name="phone" size={20} color="white" />
              </TouchableOpacity>

              {/* Cross button to remove a contact only when editing */}
              {contact.isEditing && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveContact(contact.id)}
                >
                  <Feather name="x" size={12} color="black" />
                </TouchableOpacity>
              )}

              {/* Button to toggle the editing state of the contact */}
              <TouchableOpacity
                onPress={() => handleEditContact(contact.id)}
                style={styles.editButton}
              >
                <Feather name="edit" size={16} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.messagesSection}>
        <Text style={styles.messagesTitle}>
          Send pre-set emergency messages
        </Text>
        {presetMessages.map((message, index) => (
          <TouchableOpacity key={index} style={styles.messageCard}>
            <Text style={styles.messageText}>{message}</Text>
          </TouchableOpacity>
        ))}

        {isCustomizing ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Customize message 1"
              value={customMessage1}
              onChangeText={setCustomMessage1}
            />
            <TextInput
              style={styles.input}
              placeholder="Customize message 2"
              value={customMessage2}
              onChangeText={setCustomMessage2}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveCustomMessages}
            >
              <Text style={styles.saveButtonText}>Save Messages</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.customizeButton}
            onPress={() => setIsCustomizing(true)}
          >
            <Text style={styles.customizeText}>Customize your message</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Fixing the Watch Button positioning */}
      <Pressable
        style={styles.watchButtonContainer}
        onPress={() => router.push("/watch")}
      >
        <View style={styles.watchButton}>
          <Feather name="watch" size={35} color="white" />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    width: "55%",
    fontSize: 16,
  },
  switch: {
    width: "35%",
  },
  removeButton: {
    backgroundColor: "white",
    padding: 4,
    borderRadius: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  contactActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginLeft: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  titleSOS: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  titleSupport: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoButton: {
    padding: 4,
  },
  alarmSection: {
    padding: 20,
    alignItems: "center",
  },
  alarmTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  alarmSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  alarmButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  alarmButtonPressed: {
    backgroundColor: "#cc0000",
  },
  alarmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactsSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  contactsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 14,
    color: "#333",
  },
  contactCard: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 14,
    color: "#666",
  },
  callButton: {
    backgroundColor: "#FF0000",
    padding: 8,
    borderRadius: 25,
  },
  messagesSection: {
    padding: 20,
  },
  messagesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  messageCard: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  customizeButton: {
    marginTop: 16,
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  customizeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  saveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  watchButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  watchButton: {
    backgroundColor: "#FF0000",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
