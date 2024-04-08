import { FlatList } from "react-native";
import { Stack } from "expo-router";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";

export default function OrdersScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Orders", headerTitleAlign: "center" }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </>
  );
}
