import { StyleSheet, Image } from "react-native";

import Colors from "../constants/Colors";
import { Product } from "../types";
import { Text, View } from "./Themed";

type ProductListItemProps = {
  product: Product;
};

const defaultPizzaIMG =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaIMG }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        {product.name} for Viktoriia and Yaroslav I love you, my dear wife!
      </Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
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
