import CartListItem from "@/components/CartListItem";
import { Text } from "@/components/Themed";
import { useCartContext } from "@/contextProviders/CartProvider";
import { FlatList, View } from "react-native";

const CartScreen = () => {
  const { items } = useCartContext();
  console.log({ items });

  return (
    <View style={{ padding: 10 }}>
      {items.length && (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CartListItem key={item.id} cartItem={item} />
          )}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
      )}
    </View>
  );
};

export default CartScreen;
