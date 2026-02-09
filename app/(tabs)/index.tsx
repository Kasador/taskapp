import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "../../types/Task";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Learn Expo",
      description: "Complete the first module",
      completed: false,
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
  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskItem}
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
      <Pressable
        onPress={() => setTasks(tasks.filter((task) => task.id !== item.id))}
      >
        <Ionicons name="trash" size={24} color="black" />
      </Pressable>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
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
