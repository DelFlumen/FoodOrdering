import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Button from "@/components/Button";

import products from "@assets/data/products";
import Colors from "@/constants/Colors";
import { useCartContext } from "@/contextProviders/CartProvider";
import { PizzaSize } from "@/types";
import { defaultPizzaIMG } from "@/constants/Images";
import { useRouter } from "expo-router";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCartContext();
  const router = useRouter();
  const product = products.find((product) => product.id === +id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    if (!product) console.error("no product");
    console.log({ product });

    addItem(product, selectedSize);
    router.push("/cart");
  };

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
      <Text style={styles.title}>${product.name}</Text>
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
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
