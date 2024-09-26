import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { quotes } from "@/constants/Quotes";
import { useAppContext } from "@/providers/AppProvider";
import styles from "@/styles/styles";
import { useEffect, useState } from "react";
import { Switch, TextInput } from "react-native";

interface DayEntry {
  productivity: number;
  mood: number;
  day: number;
  agenda: Record<string, { text: string; checked: boolean }>;
  grateful: string[];
  learned: string;
  not_good: string;
  quote: { text: string; author: string };
}

interface AppState {
  [key: string]: DayEntry;
}

interface AppContextType {
  state: AppState | null;
  setState: (state: AppState | ((prevState: AppState) => AppState)) => void;
  clearState: () => void;
}

export default function HomeScreen() {
  const { state, setState, clearState } = useAppContext() as AppContextType;
  const [loading, setLoading] = useState<boolean>(true);
  const [formattedToday, setFormattedToday] = useState<string | undefined>();
  const [today, setToday] = useState<Date | undefined>();
  
  const locales = {
    en: "en-US",
    es: "es-ES",
    ca: "ca-ES",
  };

  const currentLanguage = "es";

  const formattedDate = today 
    ? new Intl.DateTimeFormat(locales[currentLanguage], {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(today)
    : "";

  const handleProductivityChange = (text: string) => {
    const productivityValue = Number(text);
    if (productivityValue <= 10 && productivityValue >= 0) {
      if (state && formattedToday) {
        setState((prevState) => ({
          ...prevState,
          [formattedToday]: {
            ...prevState[formattedToday],
            productivity: productivityValue,
          },
        }));
      }
    }
  };

  const handleMoodChange = (text: string) => {
    const moodValue = Number(text);
    if (moodValue <= 10 && moodValue >= 0) {
      if (state && formattedToday) {
        setState((prevState) => ({
          ...prevState,
          [formattedToday]: {
            ...prevState[formattedToday],
            mood: moodValue,
          },
        }));
      }
    }
  };

  const handleAgendaChange = (key: string, text: string, checked: boolean) => {
    if (state && formattedToday) {
      setState((prevState) => ({
        ...prevState,
        [formattedToday]: {
          ...prevState[formattedToday],
          agenda: {
            ...prevState[formattedToday].agenda,
            [key]: { text, checked },
          },
        },
      }));
    }
  };

  const handleGratefulChange = (index: number, text: string) => {
    if (state && formattedToday) {
      setState((prevState) => {
        const updatedGrateful = [
          ...(prevState[formattedToday]?.grateful || []),
        ];
        updatedGrateful[index] = text;

        return {
          ...prevState,
          [formattedToday]: {
            ...prevState[formattedToday],
            grateful: updatedGrateful,
          },
        };
      });
    }
  };

  const handleLearnedChange = (text: string) => {
    if (state && formattedToday) {
      setState((prevState) => ({
        ...prevState,
        [formattedToday]: {
          ...prevState[formattedToday],
          learned: text,
        },
      }));
    }
  };

  useEffect(() => {
    setLoading(true);
    const defaultDayEntry: DayEntry = {
      productivity: 0,
      mood: 0,
      day: 0,
      agenda: {},
      grateful: ["", ""],
      learned: "",
      not_good: "",
      quote: { text: "", author: "" },
    };

    const today = new Date();
    today.setHours(today.getHours() + 2); // Add 2 hours to the current time
    setToday(today);
    const formattedDateString = today.toISOString().split("T")[0];
    setFormattedToday(formattedDateString);

    if (state && !state[formattedDateString]) {
      const existingDays = Object.values(state).map((entry) => entry.day);
      const maxDay = existingDays.length > 0 ? Math.max(...existingDays) : 0;

      const randomIndex = Math.floor(Math.random() * quotes.length);
      defaultDayEntry.quote = quotes[randomIndex];
      defaultDayEntry.day = maxDay + 1;

      setState((prevState) => ({
        ...prevState,
        [formattedDateString]: defaultDayEntry,
      }));
    }
    setLoading(false);
  }, [state, setState]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.row]}>
        <ThemedText type="subtitle">{formattedDate}</ThemedText>
        <ThemedText type="subtitle">
          Dia: {state ? JSON.stringify(state[formattedToday!]?.day) : ""}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.mv36}>
        <ThemedText style={styles.textAlignCenter} type="quote">
          {state && formattedToday && state[formattedToday]?.quote?.text
            ? `"${state[formattedToday].quote?.text}"`
            : "Loading quote..."}
        </ThemedText>
        <ThemedText style={styles.textAlignCenter} type="author">
          {state && formattedToday && state[formattedToday]?.quote?.author
            ? `${state[formattedToday].quote?.author}`
            : ""}
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.row, styles.pb20]}>
        <ThemedView style={[styles.row]}>
          <ThemedText type="defaultSemiBold">Productividad:</ThemedText>
          <TextInput
            style={styles.inputNumber}
            value={state ? String(state[formattedToday!]?.productivity ?? '') : ''}
            onChangeText={handleProductivityChange}
            keyboardType="numeric"
            editable={!loading}
          />
        </ThemedView>

        <ThemedView style={[styles.row]}>
          <ThemedText type="defaultSemiBold">Mood:</ThemedText>
          <TextInput
            style={styles.inputNumber}
            value={state ? String(state[formattedToday!]?.mood ?? '') : ''}
            onChangeText={handleMoodChange}
            keyboardType="numeric"
            editable={!loading}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView>
        <ThemedText
          style={[styles.textAlignCenter, styles.underline]}
          type="subtitle"
        >
          Agenda para hoy
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.agendaContainer, styles.pb20]}>
        {["task1", "task2", "task3", "task4"].map((task, index) => (
          <ThemedView key={index} style={styles.agendaRow}>
            <ThemedView style={styles.switchContainer}>
              <Switch
                disabled={loading}
                thumbColor={
                  state
                    ? state[formattedToday!]?.agenda[task]?.checked
                      ? "#A9D8E4"
                      : "#ffffff"
                    : "#ffffff"
                }
                trackColor={{ false: "#A9D8E4", true: "#A9D8E4" }}
                value={
                  state ? !!state[formattedToday!]?.agenda[task]?.checked : false
                }
                onValueChange={(checked) =>
                  handleAgendaChange(
                    task,
                    (state && state[formattedToday!]?.agenda[task]?.text) || "",
                    checked
                  )
                }
              />
            </ThemedView>
            <TextInput
              style={styles.input}
              placeholder={
                index === 0
                  ? "Primera tarea importante del día"
                  : index === 1
                  ? "Otra tarea clave a completar"
                  : index === 2
                  ? "Tarea secundaria o menor"
                  : "Algo adicional por hacer hoy"
              }
              placeholderTextColor="#B0B8C6"
              value={
                state ? state[formattedToday!]?.agenda[task]?.text || "" : ""
              }
              onChangeText={(text) =>
                handleAgendaChange(
                  task,
                  text,
                  (state && !!state[formattedToday!]?.agenda[task]?.checked) || false
                )
              }
              editable={!loading}
            />
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.pb20}>
        <ThemedText style={styles.textAlignCenter} type="author">
          Estoy agradecido por
        </ThemedText>
        <TextInput
          style={[styles.input, styles.mv10]}
          placeholder="¿Por qué te sientes agradecido hoy?"
          placeholderTextColor="#B0B8C6"
          value={state ? state[formattedToday!]?.grateful[0] ?? '' : ''}
          onChangeText={(text) => handleGratefulChange(0, text)}
          editable={!loading}
        />
        <TextInput
          style={[styles.input, styles.mt10]}
          placeholder="Algo más por lo que te sientes agradecido"
          placeholderTextColor="#B0B8C6"
          value={state ? state[formattedToday!]?.grateful[1] ?? '' : ''}
          onChangeText={(text) => handleGratefulChange(1, text)}
          editable={!loading}
        />
      </ThemedView>

      <ThemedView style={styles.pb20}>
        <ThemedText style={styles.textAlignCenter} type="author">
          He aprendido
        </ThemedText>
        <TextInput
          style={[styles.input, styles.textArea, styles.mv10]}
          placeholder="Escribe algo que hayas aprendido..."
          placeholderTextColor="#B0B8C6"
          multiline={true}
          numberOfLines={4}
          value={state ? state[formattedToday!]?.learned : ""}
          onChangeText={(text) => handleLearnedChange(text)}
          editable={!loading}
        />
      </ThemedView>
    </ThemedView>
  );
}
