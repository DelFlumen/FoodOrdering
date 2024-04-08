import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: "Orders",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
