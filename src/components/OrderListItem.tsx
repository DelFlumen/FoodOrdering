import { StyleSheet, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { Order } from "../types";
import { Text, View } from "./Themed";
import { Tables } from "@/database.types";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<"orders">;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <>
      {order ? (
        <Link
          href={`/${segments[0]}/orders/${order?.id}` as `${string}:${string}`}
          asChild
        >
          <Pressable style={styles.container}>
            <View>
              <Text style={styles.title}>Order #{order.id}</Text>
              <Text style={styles.timeText}>
                {dayjs(order.created_at).fromNow()}
              </Text>
            </View>
            <Text style={styles.statusText}>{order.status}</Text>
          </Pressable>
        </Link>
      ) : (
        <div>Order not found</div>
      )}
    </>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
