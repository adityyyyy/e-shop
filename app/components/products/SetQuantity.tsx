import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProp {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

export default function SetQuantity({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: SetQuantityProp) {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex gap-4 items-center text-base">
        <button
          onClick={handleQuantityDecrease}
          className="border-[1.2px] border-slate-300 px-2 rounded"
        >
          &#8722;
        </button>
        <div className="w-8 text-center">{cartProduct.quantity}</div>
        <button
          onClick={handleQuantityIncrease}
          className="border-[1.2px] border-slate-300 px-2 rounded"
        >
          &#43;
        </button>
      </div>
    </div>
  );
}
