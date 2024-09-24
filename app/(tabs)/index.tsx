import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  TextInput,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "@/providers/AppProvider";
import { useEffect } from "react";
import styles from "@/styles/styles";
import { quotes } from "@/constants/Quotes";

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

  const handleProductivityChange = (text: string) => {
    const productivityValue = Number(text);
    // Validate the input
    if (productivityValue <= 10 && productivityValue >= 0) {
      // Check if state is defined and has today's entry
      if (state && state[formattedToday]) {
        setState((prevState) => {
          if (prevState) {
            // Ensure prevState is not null
            return {
              ...prevState,
              [formattedToday]: {
                ...prevState[formattedToday],
                productivity: productivityValue, // Update only if valid
              },
            };
          }
          return prevState; // Return the previous state if null (shouldn't happen in normal flow)
        });
      }
    }
  };

  const handleMoodChange = (text: string) => {
    const moodValue = Number(text);
    // Validate the input
    if (moodValue <= 10 && moodValue >= 0) {
      // Check if state is defined and has today's entry
      if (state && state[formattedToday]) {
        setState((prevState) => {
          if (prevState) {
            // Ensure prevState is not null
            return {
              ...prevState,
              [formattedToday]: {
                ...prevState[formattedToday],
                mood: moodValue, // Update only if valid
              },
            };
          }
          return prevState; // Return the previous state if null (shouldn't happen in normal flow)
        });
      }
    }
  };

  useEffect(() => {
    const defaultDayEntry = {
      productivity: 0,
      mood: 0,
      day: 0,
      agenda: {},
      grateful: [],
      learned: "",
      not_good: "",
      quote: { text: "", author: "" },
    };

    if (state && !state[formattedToday]) {
      const existingDays = Object.values(state).map((entry) => entry.day);
      const maxDay = existingDays.length > 0 ? Math.max(...existingDays) : 0;

      const randomIndex = Math.floor(Math.random() * quotes.length);
      defaultDayEntry.quote = quotes[randomIndex];
      defaultDayEntry.day = maxDay + 1;

      setState((prevState) => ({
        ...prevState,
        [formattedToday]: defaultDayEntry,
      }));
    }
  }, [state, formattedToday, setState]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.row]}>
        <ThemedText type="subtitle">{formattedDate}</ThemedText>
        <ThemedText type="subtitle">
          Dia: {state ? JSON.stringify(state[formattedToday]?.day) : ""}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.mv36}>
        <ThemedText style={styles.textAlignCenter} type="quote">
          {state && state[formattedToday]?.quote?.text
            ? `"${state[formattedToday].quote?.text}"`
            : "Loading quote..."}
        </ThemedText>
        <ThemedText style={styles.textAlignCenter} type="author">
          {state && state[formattedToday]?.quote?.author
            ? `${state[formattedToday].quote?.author}`
            : ""}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.row, styles.pb20]}>
        <ThemedView style={[styles.row]}>
          <ThemedText type="defaultSemiBold">Productividad:</ThemedText>
          <TextInput
            style={styles.input}
            value={state ? String(state[formattedToday]?.productivity) : ""}
            onChangeText={handleProductivityChange}
            keyboardType="numeric"
          />
        </ThemedView>
        <ThemedView style={[styles.row]}>
          <ThemedText type="defaultSemiBold">Mood:</ThemedText>
          <TextInput
            style={styles.input}
            value={state ? String(state[formattedToday]?.mood) : ""}
            onChangeText={handleMoodChange}
            keyboardType="numeric"
          />
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.pb20]}>
        <ThemedText
          type="subtitle"
          style={[styles.textAlignCenter, styles.underline]}
        >
          Agenda para hoy
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Clear State" onPress={clearState} />
      </ThemedView>
    </ThemedView>
  );
}
