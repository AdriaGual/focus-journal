import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Button,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "@/providers/AppProvider";
import styles from "@/styles/styles";

export default function TabTwoScreen() {
  const { state, setState } = useAppContext();
  console.log(state);
  const days = Object.keys(state || {}).map(date => ({
    date,
    dayInfo: state[date],
  }));
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.dayItem}>
      <ThemedText style={styles.dateText}>{item.date}</ThemedText>
      <ThemedText style={styles.daySummary}>
        Productividad: {item.dayInfo.productivity} | Mood: {item.dayInfo.mood}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
    <FlatList
      data={days}
      renderItem={renderItem}
      keyExtractor={(item) => item.date}
      contentContainerStyle={styles.listContainer}
    /></ThemedView>
  );
}
