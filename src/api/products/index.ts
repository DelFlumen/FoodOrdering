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
        .select()
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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return updatedProduct;
    },
    async onSuccess(_, data) {
      // @ts-ignore comment
      await queryClient.invalidateQueries(["products"]);
      // @ts-ignore comment
      await queryClient.invalidateQueries(["products", data.id]);
    },
    onError(error) {
      console.log(error.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: any) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw new Error(error.message);
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
