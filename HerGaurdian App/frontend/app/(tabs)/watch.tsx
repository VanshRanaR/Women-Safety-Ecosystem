import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SmartWatchFeaturesScreen() {
  const router=useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          <Text style={styles.headerTitleColored}>Smart Watch</Text> Features
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Image
            source={require("../../assets/image/Watch_icon.png")}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <Text style={styles.heroText}>
            Stay protected with real-time health monitoring and instant alerts.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <View style={styles.featureHeader}>
              <MaterialIcons name="favorite" size={24} color="red" />
              <Text style={styles.featureTitle}>Heart Rate Alerts</Text>
            </View>
            <Text style={styles.featureDescription}>
              Get notified when your heart rate is elevated
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureHeader}>
              <MaterialIcons name="timer" size={24} color="black" />
              <Text style={styles.featureTitle}>Safety Timer</Text>
            </View>
            <View style={styles.timerFeature}>
              <Text style={styles.timerTitle}>20-Second Safety Timer</Text>
              <Text style={styles.timerDescription}>
                If you are not safe, the timer will alert your emergency
                contacts
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.updateButton}
        //   onPress={() => navigation.navigate("EmergencyContacts")}
        >
          <Text style={styles.updateButtonText}>Update Emergency Contacts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
  },
  headerTitleColored: {
    color: "#FF0000",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  heroImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  heroText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  featuresSection: {
    paddingVertical: 20,
    gap: 24,
  },
  featureItem: {
    gap: 8,
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    marginLeft: 36,
  },
  timerFeature: {
    marginLeft: 36,
  },
  timerTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  timerDescription: {
    fontSize: 14,
    color: "#666",
  },
  updateButton: {
    backgroundColor: "#FF0000",
    padding: 16,
    borderRadius: 25,
    position: "absolute",
    bottom: 32,
    left: 20,
    right: 20,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
