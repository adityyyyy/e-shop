import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

interface Props {
  [propName: string]: any;
}

type CartContextType = {
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null,
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopItems");
    const storedItems: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(storedItems);
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 },
        );
        setCartTotalQuantity(qty);
        setCartTotalAmount(total);
      }
    };

    getTotal();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = [...(prev || []), product];

      localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success("Product added to cart");
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);
        localStorage.setItem("eShopItems", JSON.stringify(filteredProducts));
        toast.success("Product removed from cart");
      }
    },
    [cartProducts],
  );

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 99) {
        return toast.error("Oops! Maximum quantity reached");
      }

      if (cartProducts) {
        const updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id,
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts],
  );

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) {
        return toast.error("Oops! Minimum quantity reached");
      }

      if (cartProducts) {
        const updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id,
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts],
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQuantity(0);
    localStorage.setItem("eShopItems", JSON.stringify(null));
  }, []);

  const value = {
    cartTotalQuantity,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within CartContextProvider");
  }

  return context;
};
