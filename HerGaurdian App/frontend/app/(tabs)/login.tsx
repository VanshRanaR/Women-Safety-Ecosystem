import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>
          <Text style={styles.herText}>Her</Text>
          <Text style={styles.guardianText}>Guardian</Text>
        </Text>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome !</Text>
          <Text style={styles.signInText}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A1A1A1"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountButton}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
    marginTop: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  herText: {
    color: "#FF3B30",
  },
  guardianText: {
    color: "#000",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  signInText: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: -8,
  },
  input: {
    backgroundColor: "#EEEEF0",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  forgotPassword: {
    color: "#666",
    textAlign: "left",
  },
  loginButton: {
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  createAccountButton: {
    backgroundColor: "#EEEEF0",
    padding: 16,
    borderRadius: 8,
  },
  createAccountText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
});
