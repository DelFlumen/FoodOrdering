import { StyleSheet, Pressable, Image } from "react-native";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { OrderItem } from "../types";
import { Text, View } from "./Themed";
import { defaultPizzaIMG } from "@/constants/Images";
import Colors from "@/constants/Colors";

dayjs.extend(relativeTime);

type OrderItemProps = {
  orderItem: OrderItem;
};

const OrderItemCard = ({ orderItem }: OrderItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: orderItem.products.image || defaultPizzaIMG }}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.title}>{orderItem.products.name}</Text>
        <Text style={styles.price}>
          ${orderItem.products.price} <Text>Size: {orderItem.size}</Text>
        </Text>
      </View>
      <Text style={styles.statusText}>{orderItem.quantity}</Text>
    </View>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "20%",
    aspectRatio: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: "auto",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "400",
    color: "grey",
  },
  price: {
    fontSize: 18,
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
