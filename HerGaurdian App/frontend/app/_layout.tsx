import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/SOS_support" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/crime_reporting" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/report_submission" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/watch" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/community_form" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/alarm" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/HeatMap" options={{ headerShown: false }} />
    </Stack>
  );
}
