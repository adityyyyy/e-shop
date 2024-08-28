import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface IParams {
  productId?: string;
}

export default function Product({ params }: { params: IParams }) {
  const product = products.find((item) => item.id === params.productId);
  return (
    <div>
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}
