import { StyleSheet, Image, Pressable, FlatList, View } from "react-native";
import { Link, Stack, useLocalSearchParams, useSegments } from "expo-router";

import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import OrderItemCard from "@/components/OrderItemCard";
import StatusSelector from "@/components/StatusSelector";

const OrderDetailsScreen = () => {
  const segments = useSegments();
  const { id } = useLocalSearchParams();
  const order = orders.find((ord) => ord.id === +id);

  if (!order) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: `Order #${order?.id}`, headerTitleAlign: "center" }}
      />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <OrderItemCard orderItem={item} />}
        // ListHeaderComponent={() => <HeaderCard item={ item} /}
        ListFooterComponent={<StatusSelector order={order} />}
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
