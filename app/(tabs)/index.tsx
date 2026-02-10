import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "../../types/Task";

export default function TasksScreen() {
  const priorityColors = {
    high: "#ffe5e5",
    medium: "#fff4cc",
    low: "#e6f7e6",
  };
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Learn Expo",
      description: "Complete the first module",
      completed: false,
      priority: "high",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Test task",
      description: "Another task for testing",
      completed: false,
      priority: "low",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Another test task",
      description: "Another task for testing medium priority",
      completed: false,
      priority: "medium",
      createdAt: new Date(),
    },
  ]);
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const deleteTask = (id: string) => {
    // https://reactnative.dev/docs/alert
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          setTasks(tasks.filter((task) => task.id !== id));
        },
      },
    ]);
  };
  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        { backgroundColor: priorityColors[item.priority] },
      ]}
      onPress={() => toggleTask(item.id)}
    >
      <View style={styles.taskContent}>
        <Text
          style={[styles.taskTitle, item.completed && styles.completedTask]}
        >
          {item.title}
        </Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
      <Text style={styles.taskStatus}>
        {item.completed ? (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="red" />
        )}
      </Text>
      <Pressable onPress={() => deleteTask(item.id)}>
        <Ionicons name="trash" size={24} color="black" />
      </Pressable>
    </TouchableOpacity>
  );
  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
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
        keyExtractor={(item) => item.id}
        style={styles.list}
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
});
