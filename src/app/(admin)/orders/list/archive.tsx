import { ActivityIndicator, FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";
import { Text } from "@/components/Themed";

export default function OrdersScreen() {
  const {
    data: orders,
    error,
    isLoading,
  } = useAdminOrderList({ archived: true });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch products</Text>;

  return (
    <>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
