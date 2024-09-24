import { Image, StyleSheet, Platform, Button, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "@/providers/AppProvider";
import { useEffect } from "react";
import styles from "@/styles/styles";

export default function HomeScreen() {
  const { state, setState, clearState } = useAppContext();

  const locales = {
    en: "en-US",
    es: "es-ES",
    ca: "ca-ES",
  };

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const currentLanguage = "es";

  const formattedDate = new Intl.DateTimeFormat(locales[currentLanguage], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(today);

  useEffect(() => {
    const defaultDayEntry = {
      productivity: 0,
      mood: 0,
      day: 0,
      agenda: {},
      grateful: [],
      learned: "",
      not_good: "",
    };

    if (state && !state[formattedToday]) {
      const existingDays = Object.values(state).map((entry) => entry.day);
      const maxDay = existingDays.length > 0 ? Math.max(...existingDays) : 0;

      defaultDayEntry.day = maxDay + 1;

      setState((prevState) => ({
        ...prevState,
        [formattedToday]: defaultDayEntry,
      }));
    }
  }, [state, formattedToday, setState]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">{formattedDate}</ThemedText>
        <ThemedText type="subtitle">
          Dia: {state ? JSON.stringify(state[formattedToday]?.day) : ""}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Clear State" onPress={clearState} />
      </ThemedView>
    </ThemedView>
  );
}
