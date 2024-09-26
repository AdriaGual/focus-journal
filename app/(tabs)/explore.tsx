import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "@/providers/AppProvider";
import styles from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react"; // Import useState for managing state
import { FlatList, TouchableOpacity, View } from "react-native";

export default function TabTwoScreen() {
  const { state, setState } = useAppContext();
  console.log(state);
  const days = Object.keys(state || {}).map((date) => ({
    date,
    dayInfo: state[date],
  }));

  // State to track which item is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  const renderItem = ({ item, index }) => {
    const isExpanded = expandedIndex === index; // Check if this item is expanded

    return (
      <View>
        <TouchableOpacity
          style={styles.dayItem}
          onPress={() => setExpandedIndex(isExpanded ? null : index)} // Toggle expansion
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
              {["task1", "task2", "task3", "task4"].map((task, index) => (
                <ThemedText type="details">
                  {item.dayInfo.agenda[task]?.text}
                </ThemedText>
              ))}

              <ThemedText  type="defaultSemiBold">
                Estoy agradecido por
              </ThemedText>
              <ThemedText type="details">
               {item.dayInfo.grateful[0]}
              </ThemedText>
              <ThemedText type="details">
               {item.dayInfo.grateful[1]}
              </ThemedText>
              <ThemedText type="defaultSemiBold">He aprendido</ThemedText>
              <ThemedText type="details">{item.dayInfo.learned}</ThemedText>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={days}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}
