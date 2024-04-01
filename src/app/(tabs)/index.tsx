import { View } from "@components/Themed";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";

export default function MenuScreen() {
  return (
    <View>
      {products &&
        products.map((product) => <ProductListItem product={product} />)}
    </View>
  );
}
