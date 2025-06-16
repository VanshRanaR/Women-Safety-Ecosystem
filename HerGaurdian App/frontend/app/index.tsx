import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";



export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "PaytoneOne-Regular": require("../assets/fonts/PaytoneOne-Regular.ttf"),
  });
  // const fontsLoaded =false;
  const router=useRouter()

  if (!fontsLoaded) {
    return <View style={{height:'100%',position:"relative",backgroundColor:'white'}} >
      <Image
      // height={100}
      // width={100}
      style={{height:'50%',width:'100%',position:'relative',top:'25%'}}
      source={require("../assets/image/Loading.png")}
      ></Image>
    </View>;
  }

  const menuItems = [
    {
      id: 1,
      icon: require("../assets/image/SOS_button.png"),
      title: "SOS Support",
      description: "Quickly respond to SOS incidents.",
      onPress: () => {
        router.push("/SOS_support");
      },
    },
    {
      id: 2,
      icon: require("../assets/image/community_button.png"),
      title: "Community Forum",
      description: "Help the person who is near you.",
      onPress: () => {
        router.push("/community_form");
      },
    },
    {
      id: 3,
      icon: require("../assets/image/crime_button.png"),
      title: "Crime Reporting",
      description: "Report a Crime and update the heatmap.",
      onPress: () => {
        router.push("/crime_reporting");
      },
    },
    {
      id: 4,
      icon: require("../assets/image/Risk_button.png"),
      title: "High Risk Areas",
      description: "Get alerts when you are in high risk area.",
      onPress: () => {
        router.push("/HeatMap");
      },
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        
        <Image
          source={require("../assets/image/Logo.png")}
          style={styles.logoImage}
        />
        <Pressable onPress={() => router.push("/login")}style={styles.profileButton}>
          <Feather name="user" size={24} color="black"/>
        </Pressable>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Safety at your fingertips</Text>
        <Text style={styles.heroSubtitle}>With HerGuardian, you can</Text>

        <Image
          source={require("../assets/image/Hero.png")}
          style={styles.heroImage}
        />
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "#EB2C2CFF" : "#FF6B6B" },
              styles.menuItem,
            ]}
            key={item.id}
            onPress={item.onPress}
          >
            <Image source={item.icon} style={styles.menuIcon} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE4E1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoImage: {

    width: "35%",
    height: "100%",
    resizeMode: "contain",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    
  },
  heroSection: {
    width:"100%",
    height:"40%",
    paddingTop: 20,
    backgroundColor: "#FF8484",
    padding: 10,
    alignItems: "flex-start",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    fontFamily: "PaytoneOne-Regular",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "white",
    opacity: 0.9,
    fontFamily: "PaytoneOne-Regular",
  },

  heroImage: {
    paddingTop:"50%",
    width: "100%",
    height: "60%",

  },

  menuContainer: {
    borderRadius: 12,
    padding: 20,
    gap: 12,
    
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    height:"15%",
    // backgroundColor: "#FF6B6B",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
    fontFamily: "PaytoneOne-Regular",
  },
  menuDescription: {
    fontSize: 10,
    color: "white",
    opacity: 0.9,
    fontFamily: "PaytoneOne-Regular",
  },
});




