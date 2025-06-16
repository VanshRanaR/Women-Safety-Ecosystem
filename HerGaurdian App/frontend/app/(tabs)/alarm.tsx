import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

export default function SafetyAlarmScreen() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(180); 
  const [sound, setSound] = useState();
  const [alarmPlayed, setAlarmPlayed] = useState(false);
  const [emergencySent, setEmergencySent] = useState(false); 

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });

    playSound();

    const emergencyTimer = setTimeout(() => {
      if (!emergencySent) {
        handleNotifyContacts();
        setEmergencySent(true);
      }
    }, 180000); 

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      clearTimeout(emergencyTimer); 
    };
  }, [sound]);

  async function playSound() {
    if (alarmPlayed) return;
    setAlarmPlayed(true);

    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sound/alert.wav")
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleCancel = () => {
    if (sound) {
      sound.stopAsync();
    }
    router.back();
  };

  const handleNotifyContacts = () => {
    console.log("Emergency message sent to saved contacts");
    // Here you can implement the logic to send the emergency message to the saved contacts.
    alert("Emergency message sent to saved contacts");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleSafety}>Safety alarm</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Alarm activated</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Your alarm has been activated. We will notify your contacts in 3
          minutes if you don't cancel it.
        </Text>

        <Image
          source={require("../../assets/image/alarm_illustration.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.timerContainer}>
          <View style={styles.timerBlock}>
            <Text style={styles.timerNumber}>
              {String(minutes).padStart(2, "0")}
            </Text>
            <Text style={styles.timerLabel}>Minutes</Text>
          </View>
          <View style={styles.timerBlock}>
            <Text style={styles.timerNumber}>
              {String(seconds).padStart(2, "0")}
            </Text>
            <Text style={styles.timerLabel}>Seconds</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notifyButton}
            onPress={handleNotifyContacts}
          >
            <Text style={styles.notifyButtonText}>Notify contacts</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSafety: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000",
  },
  closeButton: {
    fontSize: 24,
    color: "#666",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  illustration: {
    width: "110%",
    height: 400,
    marginVertical: 24,
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 32,
  },
  timerBlock: {
    alignItems: "center",
  },
  timerNumber: {
    fontSize: 48,
    fontWeight: "bold",
  },
  timerLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    position: "absolute",
    bottom: 32,
    left: 16,
    right: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
  },
  cancelButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  notifyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: "#FF0000",
  },
  notifyButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});