import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
