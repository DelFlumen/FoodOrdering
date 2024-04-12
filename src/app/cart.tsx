import Button from "@/components/Button";
import CartListItem from "@/components/CartListItem";
import { Text } from "@/components/Themed";
import { useCartContext } from "@/providers/CartProvider";
import { FlatList, StyleSheet, View } from "react-native";

const CartScreen = () => {
  const { items, total } = useCartContext();
  console.log({ items });

  return (
    <View style={{ padding: 10 }}>
      {items.length ? (
        <View>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <CartListItem key={item.id} cartItem={item} />
            )}
            contentContainerStyle={{ gap: 10 }}
          />
          <Text style={styles.total}>Total: ${total}</Text>
          <Button text="Checkout" />
        </View>
      ) : (
        <Text>No items</Text>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
});
