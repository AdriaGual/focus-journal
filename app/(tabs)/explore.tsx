import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DayEntry } from "@/interfaces/DayEntry";
import { useAppContext } from "@/providers/AppProvider";
import styles from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

type DayItem = {
  date: string;
  dayInfo: DayEntry;
};

export default function TabTwoScreen() {
  const { state } = useAppContext();

  console.log(state);

  const days: DayItem[] = Object.keys(state ?? {})
    .map((date) => ({
      date,
      dayInfo: state?.[date],
    }))
    .filter((day): day is DayItem => day.dayInfo !== undefined);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const renderItem = ({ item, index }: { item: DayItem; index: number }) => {
    const isExpanded = expandedIndex === index;

    return (
      <View key={item.date}>
        <TouchableOpacity
          style={styles.dayItem}
          onPress={() => setExpandedIndex(isExpanded ? null : index)}
        >
          <ThemedText style={styles.dateText}>{item.date}</ThemedText>
          <ThemedText style={styles.daySummary}>
            Productividad: {item.dayInfo.productivity} | Mood:{" "}
            {item.dayInfo.mood}
          </ThemedText>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
          />
          {isExpanded && (
            <View style={styles.detailsContainer}>
              <ThemedText type="defaultSemiBold">Agenda</ThemedText>
              {["task1", "task2", "task3", "task4"].map((task, taskIndex) => (
                <ThemedText key={taskIndex} type="details">
                  {item.dayInfo.agenda[task]?.text || "No data"}
                </ThemedText>
              ))}

              <ThemedText type="defaultSemiBold">
                Estoy agradecido por
              </ThemedText>
              {item.dayInfo.grateful.length > 0 ? (
                item.dayInfo.grateful.map((gratefulItem, gratefulIndex) => (
                  <ThemedText key={gratefulIndex} type="details">
                    {gratefulItem}
                  </ThemedText>
                ))
              ) : (
                <ThemedText type="details">No data</ThemedText>
              )}

              <ThemedText type="defaultSemiBold">He aprendido</ThemedText>
              <ThemedText type="details">
                {item.dayInfo.learned || "No data"}
              </ThemedText>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={days} // days now contains only valid DayItems
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}
