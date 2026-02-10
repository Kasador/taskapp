import { Ionicons } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { Task } from "../../types/Task";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../services/storage";

export default function TasksScreen() {
  const priorityColors = {
    high: "#ffe5e5",
    medium: "#fff4cc",
    low: "#e6f7e6",
  };

  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const { tasks, loading, error, deleteTask, updateTask, refreshTasks } =
    useTasks();

  useFocusEffect(
    useCallback(() => {
      refreshTasks();
    }, [refreshTasks]),
  );

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
    } catch {
      Alert.alert("Error", "Failed to update task");
    }
  };

  const handleDeleteTask = async (id: number) => {
    console.log("Attempting to delete task with id:", id);
    if (Platform.OS === "web") {
      // I need to added Platform for the web version, other the alert wouldn't pop up and it wouldn't have deleted the task.
      const ok = window.confirm("Are you sure you want to delete this task?");
      if (!ok) return;

      try {
        await deleteTask(id);
      } catch (error) {
        window.alert("Failed to delete task");
      }
      return;
    }
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(id);
          } catch {
            Alert.alert("Error", "Failed to delete task");
          }
        },
      },
    ]);
  };
  const renderTask = ({ item }: { item: Task }) => (
    <View
      style={[
        styles.taskItem,
        { backgroundColor: priorityColors[item.priority] },
      ]}
    >
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => handleToggleComplete(item.id!, item.completed)}
      >
        <Text
          style={[styles.taskTitle, item.completed && styles.completedTask]}
        >
          {item.title}
        </Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </TouchableOpacity>

      <View style={styles.taskActions}>
        <Pressable onPress={() => handleDeleteTask(item.id!)}>
          <Ionicons name="trash" size={24} color="black" />
        </Pressable>

        {item.completed ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="red" />
        )}
      </View>
    </View>
  );
  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }
  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 16,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Pressable
          onPress={() => setFilter("all")}
          style={{ cursor: "pointer" }}
        >
          <Text>All</Text>
        </Pressable>

        <Pressable onPress={() => setFilter("active")}>
          <Text>Active</Text>
        </Pressable>

        <Pressable onPress={() => setFilter("completed")}>
          <Text>Completed</Text>
        </Pressable>
      </View>
      <Text style={{ padding: 16, fontStyle: "italic", color: "#666" }}>
        Showing all{" "}
        <Text style={{ fontWeight: "bold", color: "#007aff" }}>
          {filteredTasks.length} {filter}
        </Text>{" "}
        tasks...
      </Text>
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id?.toString() || ""}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>No tasks yet!</Text>
          </View>
        }
      />
      <Link href="/add-task" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  taskStatus: {
    fontSize: 24,
  },
  addButton: {
    backgroundColor: "#007AFF",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
