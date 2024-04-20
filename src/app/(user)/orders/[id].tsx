import {
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import { Link, Stack, useLocalSearchParams, useSegments } from "expo-router";

import { Text } from "@/components/Themed";
import OrderListItem from "@/components/OrderListItem";
import OrderItemCard from "@/components/OrderItemCard";
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscriptions";

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = +(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);
  useUpdateOrderSubscription(id);

  if (isLoading) return <ActivityIndicator />;

  if (error) {
    return <Text>Failed to fetch an order</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: `Order #${order?.id}`, headerTitleAlign: "center" }}
      />
      <OrderListItem order={order} />
      <FlatList
        data={order?.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <OrderItemCard orderItem={item} />}
        // ListHeaderComponent={() => <HeaderCard item={ item} /}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
    backgroundColor: "unset",
  },
});
