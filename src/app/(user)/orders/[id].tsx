import { StyleSheet, Image, Pressable, FlatList } from "react-native";
import { Link, Stack, useLocalSearchParams, useSegments } from "expo-router";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import OrderListItem from "@/components/OrderListItem";
import orders from "@assets/data/orders";
import OrderItemCard from "@/components/OrderItemCard";

const OrderDetailsScreen = () => {
  const segments = useSegments();
  const { id } = useLocalSearchParams();
  const order = orders.find((ord) => ord.id === +id);

  if (!order) {
    return <Text>Product not found</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{ title: `Order #${order?.id}`, headerTitleAlign: "center" }}
      />
      <View style={styles.orderListItemWrapper}>
        <OrderListItem order={order} />
      </View>
      <FlatList
        data={order.order_items}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderItemCard orderItem={item} />}
      />
    </>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  orderListItemWrapper: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
