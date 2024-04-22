import { StyleSheet, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";

import Colors from "../constants/Colors";
import { Text } from "./Themed";
import RemoteImage from "./RemoteImage";
import { defaultPizzaIMG } from "@/constants/Images";
import { Tables } from "@/database.types";

type ProductListItemProps = {
  product: Tables<"products">;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return product ? (
    <Link
      href={`/${segments[0]}/menu/${product.id}` as `${string}:${string}`}
      asChild
    >
      <Pressable style={styles.container}>
        <RemoteImage
          path={product?.image}
          fallback={defaultPizzaIMG}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          {product.name} for Viktoriia and Yaroslav I love you, my dear wife!
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  ) : null;
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
