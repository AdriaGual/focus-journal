import { Image, StyleSheet, Platform, Button } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "@/providers/AppProvider";
import { useEffect } from "react";
import styles from "@/styles/styles";

export default function HomeScreen() {
  const { state, setState } = useAppContext();
  let tomorrow  = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const defaultDayEntry = {
      productivity: 0,
      mood: 0,
      day: 0,
      agenda: {},
      grateful: [],
      learned: '',
      not_good: '',
    };

    if (state && !state[today]) {
      const existingDays = Object.values(state).map(entry => entry.day);
      const maxDay = existingDays.length > 0 ? Math.max(...existingDays) : 0;

      defaultDayEntry.day = maxDay + 1;

      setState((prevState) => ({
        ...prevState,
        [today]: defaultDayEntry,
      }));
    }
  }, [state, today, setState]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
      <ThemedText style={{ marginTop: 20 }}>
          {state ? JSON.stringify(state) : ''}
        </ThemedText>      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>
          to see changes. Press
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
