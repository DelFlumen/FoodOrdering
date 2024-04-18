import { CartItem } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { Tables } from "@/database.types";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order_items";

type Product = Tables<"products">;

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const router = useRouter();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const alreadyAddedItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    );

    if (alreadyAddedItem) {
      updateQuantity(alreadyAddedItem.id, 1);
    } else {
      const newCartItem: CartItem = {
        id: randomUUID(),
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };
      setItems([...items, newCartItem]);
    }
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((itm) =>
          itm.id === itemId
            ? {
                ...itm,
                quantity: itm.quantity + amount,
              }
            : itm
        )
        .filter((item) => item.quantity)
    );
  };

  const total = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    setIsLoading(true);
    console.warn("checkout");
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
    }));

    insertOrderItems(orderItems, {
      onSuccess: () => {
        setIsLoading(false);
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
