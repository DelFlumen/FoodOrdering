import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    console.log("product in provider:", product);

    const alreadyAddedItem = items.find(
      (item) => item.product_id === product.id
    );

    if (alreadyAddedItem) {
      const newItems = items.map((itm) =>
        itm.product_id === product.id
          ? {
              ...alreadyAddedItem,
              quantity: alreadyAddedItem.quantity + 1,
            }
          : itm
      );
      setItems(newItems);
    } else {
      const newCartItem: CartItem = {
        id: "1",
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };
      setItems([...items, newCartItem]);
    }
  };
  console.log({ items });

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
