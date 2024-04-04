import { StyleSheet, Image, Pressable } from "react-native";
import { Link, useSegments, DynamicRoutes } from "expo-router";

import Colors from "../constants/Colors";
import { Product } from "../types";
import { Text } from "./Themed";
import { defaultPizzaIMG } from "@/constants/Images";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link
      href={`/${segments[0]}/menu/${product.id}` as DynamicRoutes<string>}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaIMG }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          {product.name} for Viktoriia and Yaroslav I love you, my dear wife!
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    maxWidth: "50%",
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
