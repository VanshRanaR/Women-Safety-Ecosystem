import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Linking,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const initialAlerts = [
  {
    id: 1,
    message: "Someone is in danger",
    distance: "0.5 km away",
  },
  {
    id: 2,
    message: "Ring needs assistance",
    distance: "2 km away",
  },
  {
    id: 3,
    message: "Grills is in danger",
    distance: "1 km away",
  },
  {
    id: 4,
    message: "Neffie needs assistance",
    distance: "2 km away",
  },
];

const initialRecentPosts = [
  {
    id: 1,
    user: "Riya",
    time: "10 min ago",
    message: "Felt someone was following me. I was at Street 23 in Chandigarh",
  },
  {
    id: 2,
    user: "Ankita",
    time: "25 min ago",
    message: "I am walking alone to my home and someone is following me.",
  },
  {
    id: 3,
    user: "Meera",
    time: "35 min ago",
    message: "There were 3 people eve-teasing at the backstreet.",
  },
  {
    id: 4,
    user: "Riya",
    time: "40 min ago",
    message: "I am walking alone to my home and someone is following me.",
  },
  {
    id: 5,
    user: "Riya",
    time: "45 min ago",
    message: "I am walking alone to my home and someone is following me.",
  },
];

export default function CommunityForumScreen() {
  const router = useRouter();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [recentPosts, setRecentPosts] = useState(initialRecentPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialRecentPosts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPostMessage, setNewPostMessage] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(recentPosts);
    } else {
      const filtered = recentPosts.filter((post) =>
        post.user.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, recentPosts]);

  const handleAddPost = () => {
    setIsModalVisible(true);
  };
  const handleLocation = () => {
    
    const url = "https://www.google.com/maps?q=21.138269,81.664183";
        Linking.openURL(url).catch((err) =>
          console.error("Error opening URL", err)
        );
  }
  const handleSubmitPost = () => {
    if (newPostMessage.trim()) {
      const newPost = {
        id: recentPosts.length + 1,
        user: "You",
        time: "Just now",
        message: newPostMessage.trim(),
      };
      setRecentPosts([newPost, ...recentPosts]);
      setNewPostMessage("");
      setIsModalVisible(false);
    }
  };

  const handleDeletePost = (id: number) => {
    setRecentPosts(recentPosts.filter((post) => post.id !== id));
    setActiveDropdown(null);
  };

  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

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
          <Feather name="users" size={20} /> Community Forum
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="menu" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Feather name="search" size={20} color="#666" />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>ALERTS</Text>
          {alerts.map((alert) => (
            <TouchableOpacity
              onPress={handleLocation}
              key={alert.id}
              style={styles.alertItem}
            >
              <View style={styles.alertContent}>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertDistance}>{alert.distance}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {filteredPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Feather name="user" size={20} color="#666" />
                  </View>
                  <View>
                    <Text style={styles.userName}>{post.user}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => toggleDropdown(post.id)}>
                  <Feather name="more-vertical" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              {activeDropdown === post.id && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleDeletePost(post.id)}
                  >
                    <Feather name="trash-2" size={16} color="#FF0000" />
                    <Text style={styles.dropdownItemText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.postMessage}>{post.message}</Text>
              <TouchableOpacity
                onPress={handleLocation}
                style={styles.offerHelpButton}
              >
                <Text style={styles.offerHelpText}>Offer Help</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Pressable style={styles.add_button} onPress={handleAddPost}>
        <AntDesign name="plus" size={28} color="white" />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a New Post</Text>
            <TextInput
              style={styles.modalInput}
              multiline
              numberOfLines={4}
              placeholder="What's on your mind?"
              value={newPostMessage}
              onChangeText={setNewPostMessage}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmitPost}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  add_button: {
    backgroundColor: "red",
    position: "absolute",
    padding: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
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
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  content: {
    flex: 1,
  },
  alertsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
  },
  alertItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  alertDistance: {
    fontSize: 12,
    color: "#666",
  },
  postsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  postMessage: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  offerHelpButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  offerHelpText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#FF0000",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdownMenu: {
    position: "absolute",
    right: 16,
    top: 40,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    zIndex: 1,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    marginLeft: 8,
    color: "#FF0000",
    fontWeight: "500",
  },
});
