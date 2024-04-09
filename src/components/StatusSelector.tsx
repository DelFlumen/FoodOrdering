import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order, OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";

const StatusSelector = ({ order }: { order: Order }) => {
  return (
    <>
      <Text style={{ fontWeight: "bold" }}>Status</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            onPress={() => console.warn("Update status")}
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
