import { Text, View } from "@/components/Themed";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTasks } from "../../hooks/useTasks";

export default function StatisticsScreen() {
  const { tasks, loading, error, refreshTasks } = useTasks();

  // https://docs.expo.dev/versions/latest/sdk/router/#hooks
  useFocusEffect(
    /*
        useFocusEffect runs on every time the screen comes into focus,
        which is perfect for refreshing the stats whenever we navigate to this screen.
        Instead of just mounting once with useEffect.
    */
    useCallback(() => {
      refreshTasks();
    }, [refreshTasks]),
  );

  // https://react.dev/reference/react/useMemo
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;

    const high = tasks.filter((t) => t.priority === "high").length;
    const medium = tasks.filter((t) => t.priority === "medium").length;
    const low = tasks.filter((t) => t.priority === "low").length;

    return { total, completed, active, high, medium, low };
  }, [tasks]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading stats...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>

      <View style={styles.card}>
        <Text>Total: {stats.total}</Text>
        <Text>Active: {stats.active}</Text>
        <Text>Completed: {stats.completed}</Text>
      </View>

      <View style={styles.card}>
        <Text>High priority: {stats.high}</Text>
        <Text>Medium priority: {stats.medium}</Text>
        <Text>Low priority: {stats.low}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  card: {
    width: "85%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    gap: 8,
  },
});
