import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { defaultDayEntry } from "@/constants/DayEntry";
import { currentLanguage, locales } from "@/constants/Languages";
import { quotes } from "@/constants/Quotes";
import { AppContextType } from "@/interfaces/AppContextType";
import { useAppContext } from "@/providers/AppProvider";
import styles from "@/styles/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Switch,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function HomeScreen() {
  const { state, setState } = useAppContext() as AppContextType;
  const [loading, setLoading] = useState<boolean>(true);
  const [formattedToday, setFormattedToday] = useState<string | undefined>();
  const [today, setToday] = useState<Date | undefined>();
  const { t } = useTranslation();

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={[styles.row]}>
          <ThemedText type="subtitle">{formattedDate}</ThemedText>
          <ThemedText type="subtitle">
            {t("day")}:{" "}
            {state ? JSON.stringify(state[formattedToday!]?.day) : ""}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.mv36}>
          <ThemedText style={styles.textAlignCenter} type="quote">
            {state && formattedToday && state[formattedToday]?.quote?.text
              ? `"${state[formattedToday].quote?.text}"`
              : t("loadingQuote")}
          </ThemedText>
          <ThemedText style={styles.textAlignCenter} type="author">
            {state && formattedToday && state[formattedToday]?.quote?.author
              ? `${state[formattedToday].quote?.author}`
              : ""}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.row, styles.pb20]}>
          <ThemedView style={[styles.row]}>
            <ThemedText type="defaultSemiBold">{t("productivity")}:</ThemedText>
            <TextInput
              style={styles.inputNumber}
              value={
                state ? String(state[formattedToday!]?.productivity ?? "") : ""
              }
              onChangeText={handleProductivityChange}
              keyboardType="numeric"
              editable={!loading}
            />
          </ThemedView>

          <ThemedView style={[styles.row]}>
            <ThemedText type="defaultSemiBold">{t("mood")}:</ThemedText>
            <TextInput
              style={styles.inputNumber}
              value={state ? String(state[formattedToday!]?.mood ?? "") : ""}
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
            {t("agendaToday")}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.agendaContainer, styles.pb20]}>
          {["task1", "task2", "task3", "task4"].map((task, index) => (
            <ThemedView key={index} style={styles.agendaRow}>
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
                  state
                    ? !!state[formattedToday!]?.agenda[task]?.checked
                    : false
                }
                onValueChange={(checked) =>
                  handleAgendaChange(
                    task,
                    (state && state[formattedToday!]?.agenda[task]?.text) || "",
                    checked
                  )
                }
              />
              <TextInput
                style={styles.input}
                placeholder={
                  index === 0
                    ? t("firstTask")
                    : index === 1
                    ? t("anotherKeyTask")
                    : index === 2
                    ? t("secondaryTask")
                    : t("additionalTask")
                }
                placeholderTextColor="#B0B8C6"
                value={
                  state ? state[formattedToday!]?.agenda[task]?.text || "" : ""
                }
                onChangeText={(text) =>
                  handleAgendaChange(
                    task,
                    text,
                    (state &&
                      !!state[formattedToday!]?.agenda[task]?.checked) ||
                      false
                  )
                }
                editable={!loading}
              />
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.pb20}>
          <ThemedText style={styles.textAlignCenter} type="author">
            {t("gratefulFor")}
          </ThemedText>
          <TextInput
            style={[styles.input, styles.mv10]}
            placeholder={t("gratefulQuestion")}
            placeholderTextColor="#B0B8C6"
            value={state ? state[formattedToday!]?.grateful[0] ?? "" : ""}
            onChangeText={(text) => handleGratefulChange(0, text)}
            editable={!loading}
          />
          <TextInput
            style={[styles.input, styles.mt10]}
            placeholder={t("additionalGrateful")}
            placeholderTextColor="#B0B8C6"
            value={state ? state[formattedToday!]?.grateful[1] ?? "" : ""}
            onChangeText={(text) => handleGratefulChange(1, text)}
            editable={!loading}
          />
        </ThemedView>

        <ThemedView style={styles.pb20}>
          <ThemedText style={styles.textAlignCenter} type="author">
            {t("learned")}
          </ThemedText>
          <TextInput
            style={[styles.input, styles.textArea, styles.mv10]}
            placeholder={t("learnedQuestion")}
            placeholderTextColor="#B0B8C6"
            multiline={true}
            numberOfLines={4}
            value={state ? state[formattedToday!]?.learned : ""}
            onChangeText={(text) => handleLearnedChange(text)}
            editable={!loading}
          />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
