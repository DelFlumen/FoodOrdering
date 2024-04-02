import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import products from "@assets/data/products";
import Colors from "@/constants/Colors";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((product) => product.id === +id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const defaultPizzaIMG =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: product?.name, headerTitleAlign: "center" }}
      />
      <Image
        source={{ uri: product.image || defaultPizzaIMG }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <View key={size} style={styles.size}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
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
    fontSize: 18,
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
