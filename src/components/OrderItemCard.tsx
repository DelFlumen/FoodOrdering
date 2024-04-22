import { StyleSheet, Image } from "react-native";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { Text, View } from "./Themed";
import { defaultPizzaIMG } from "@/constants/Images";
import Colors from "@/constants/Colors";
import { Tables } from "@/database.types";
import RemoteImage from "./RemoteImage";

dayjs.extend(relativeTime);

type OrderItemProps = {
  orderItem: Tables<"order_items"> & { products: Tables<"products"> | null };
};

const OrderItemCard = ({ orderItem }: OrderItemProps) => {
  if (!orderItem.products) {
    console.error("Failed to fetch a product");
    return <Text>Failed to fetch a product</Text>;
  }
  return (
    <View style={styles.container}>
      <RemoteImage
        path={orderItem?.products?.image}
        fallback={defaultPizzaIMG}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.title}>{orderItem?.products?.name}</Text>
        <Text style={styles.price}>
          ${orderItem.products.price}{" "}
          <Text style={styles.sizeText}>Size: {orderItem.size}</Text>
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
  sizeText: {
    fontSize: 16,
    fontWeight: "400",
  },
  price: {
    fontSize: 18,
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
