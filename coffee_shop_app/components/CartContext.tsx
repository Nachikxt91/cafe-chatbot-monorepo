import { createContext, useContext, useState } from "react";

type CartItems = {
    [key:string]: number;
}
type CartContextType = {
  cartItems: CartItems;
  addToCart: (itemKey: string, quantity: number) => void;
  SetQuantityCart: (itemKey: string, quantity: number) => void;
  emptyCart: () => void;
}

// Create a Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [cartItems, setCartItems] = useState<CartItems>({});

  const addToCart = (itemKey: string, quantity: number) => {
  setCartItems((prevCartItems) => ({
    ...prevCartItems,
    [itemKey]: (prevCartItems[itemKey] || 0) + quantity,
  }));
  };


  const SetQuantityCart = (itemKey: string, delta: number) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemKey]:  Math.max((prevCartItems[itemKey] || 0) + delta, 0),
    }));
  };
  
  const emptyCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, emptyCart ,SetQuantityCart }}>
      {children}
    </CartContext.Provider>
  );

};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
