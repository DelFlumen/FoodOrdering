import { supabase } from "@/lib/supabase";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single();
      if (error) throw new Error(error.message);
      return newProduct;
    },
    async onSuccess() {
      // @ts-ignore comment
      await queryClient.invalidateQueries(["products"] as QueryKey, undefined);
    },
    onError(error) {
      console.log(error.message);
    },
  });
};
