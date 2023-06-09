import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import reducer, { initialState } from "./storeReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface StoreProviderProps {
  children: ReactNode;
}

interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: URL;
  inStock: string;
  quantity: number;
}

interface StoreContextValue {
  total: number;
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeItemFromCart: (product: Product) => void;
  removeFromCheckout: () => void;
}

export const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [cartItem, setCartItem] = useLocalStorage("cartItem", []);

  //Call the UpdatedPrice everytime we use cartItem
  useEffect(() => {
    updatedPrice(cartItem);
  }, [cartItem]);

  //Add to product to cart and localstorage using useLocalStorage
  const addToCart = (product: Product) => {
    const updatedCart = [...cartItem, product];
    updatedPrice(updatedCart);

    setCartItem(updatedCart);
  };

  //Remove product to cart and localstorage using useLocalStorage
  const removeItemFromCart = (product: Product) => {
    const productIndex = cartItem.findIndex(
      (currentProduct: Product) => currentProduct._id === product._id
    );

    if (productIndex !== -1) {
      const updatedCart = [...cartItem];
      updatedCart.splice(productIndex, 1);
      updatedPrice(updatedCart);

      setCartItem(updatedCart);
    }
  };
  const removeFromCart = (product: Product) => {
    const updatedCart = cartItem.filter(
      (currentProduct: { _id: string }) => currentProduct._id !== product._id
    );

    updatedPrice(updatedCart);
    setCartItem(updatedCart);
  };

  const removeFromCheckout = () => {
    localStorage.removeItem("cartItem");
    setCartItem([]);
  };

  //Update price everytime cartItem is called
  const updatedPrice = (products: Product[]) => {
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });

    dispatch({
      type: "update price",
      payload: total,
    });
  };

  const value: StoreContextValue = {
    total: state.total,
    products: cartItem,
    addToCart,
    removeFromCart,
    removeItemFromCart,
    removeFromCheckout,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
