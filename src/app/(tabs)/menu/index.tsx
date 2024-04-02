import { FlatList } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import { View } from "@/components/Themed";
import { Stack } from "expo-router";

export default function MenuScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Menu", headerTitleAlign: "center" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
