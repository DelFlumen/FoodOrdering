import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order, OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";
import { Tables } from "@/database.types";

const StatusSelector = ({
  order,
  updateStatus,
}: {
  order: Tables<"orders">;
  updateStatus: (status: string) => void | null;
}) => {
  return (
    <>
      <Text style={{ fontWeight: "bold" }}>Status</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            onPress={() => updateStatus(status)}
            style={{
              borderColor: Colors.light.tint,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
              backgroundColor:
                order.status === status ? Colors.light.tint : "transparent",
            }}
          >
            <Text
              style={{
                color: order.status === status ? "white" : Colors.light.tint,
              }}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default StatusSelector;

const styles = StyleSheet.create({});
