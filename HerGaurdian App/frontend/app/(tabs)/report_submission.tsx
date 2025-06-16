import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";

export default function ReportSubmittedScreen({ }) {
  const router= useRouter()
  const navigation = useNavigation();  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleReport}>Report</Text>
          <Text style={styles.titleSubmitted}>Submitted</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../../assets/image/police.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.messageContainer}>
          <Text style={styles.thankYouText}>
            Thank you for submitting this report.
          </Text>
          <Text style={styles.descriptionText}>
            We've received your report and we'll get back to you within 24
            hours. Your safety is our top priority.
          </Text>
        </View>

        <View style={styles.incidentDetails}>
          <Text style={styles.incidentTitle}>Incident reported</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>SECTOR</Text>
            <Text style={styles.detailValue}>453.1d</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Monday,</Text>
            <Text style={styles.detailValue}>10:30pm</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={() => {
            router.replace('/')
          }}
        >
          <Text style={styles.backHomeButtonText}>Back to home</Text>
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
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flexDirection: "row",
    marginLeft: 12,
    gap: 4,
  },
  titleReport: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000",
  },
  titleSubmitted: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: 250,
    marginBottom: 24,
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  incidentDetails: {
    width: "100%",
    marginBottom: 32,
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
  },
  backHomeButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    position: "absolute",
    bottom: 32,
    left: 20,
    right: 20,
  },
  backHomeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
