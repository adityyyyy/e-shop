"use client";

interface CartProviderProps {
  children: React.ReactNode;
}

import { CartContextProvider } from "@/hooks/useCart";
import React from "react";

export const CartProvider = ({ children }: CartProviderProps) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};
