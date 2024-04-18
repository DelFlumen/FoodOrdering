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
import Colors from "@/constants/Colors";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import OrderItemCard from "@/components/OrderItemCard";
import StatusSelector from "@/components/StatusSelector";
import { useOrderDetails } from "@/api/orders";

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = +(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);

  if (isLoading) return <ActivityIndicator />;

  if (error || !order) {
    return <Text>Failed to fetch an order</Text>;
  }

  console.log(order?.order_items[0]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: `Order #${order?.id}`, headerTitleAlign: "center" }}
      />
      <OrderListItem order={order} />
      {order && order.order_items.length && (
        <FlatList
          data={order.order_items}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) =>
            item.products && <OrderItemCard orderItem={item} />
          }
          // ListHeaderComponent={() => <HeaderCard item={ item} /}
          ListFooterComponent={<StatusSelector order={order} />}
        />
      )}
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
