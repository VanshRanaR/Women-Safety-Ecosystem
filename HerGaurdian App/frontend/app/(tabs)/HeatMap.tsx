import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";

export default function HeatmapScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const res = await fetch("https://herguardian.onrender.com/api/locations");
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const heatmapPoints = locations.map((loc) => ({
    latitude: loc.lat,
    longitude: loc.lng,
    weight: loc.count || 1,
  }));

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF0000" />
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 28.6139, // Centered on Delhi
            longitude: 77.209,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          <Heatmap
            points={heatmapPoints}
            radius={50}
            opacity={0.7}
            gradient={{
              colors: ["#00FFFF", "#0000FF", "#FF0000"],
              startPoints: [0.1, 0.5, 1],
              colorMapSize: 256,
            }}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
