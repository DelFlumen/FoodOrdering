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
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import { OrderStatusList } from "@/types";

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = +(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();

  if (isLoading || !id) return <ActivityIndicator />;

  const updateStatus = (status: string) => {
    if (id) {
      updateOrder(
        { id: id, updatedFields: { status } },
        {
          onSuccess: () => console.log("successful order status update"),
          onError: (error) =>
            console.log("updating order status error", {
              error: error.message,
              id,
            }),
        }
      );
    }
  };

  if (error || !order) {
    return <Text>Failed to fetch an order</Text>;
  }

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
          ListFooterComponent={
            <StatusSelector order={order} updateStatus={updateStatus} />
          }
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
