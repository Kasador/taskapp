import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { router } from "expo-router"; // navigate to other screens

export default function EditTaskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit a Task</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <Button title="Back to Tasks" onPress={() => router.push("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
