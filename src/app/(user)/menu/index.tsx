import { FlatList } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import { useProductList } from "@/api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch products</Text>;

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
