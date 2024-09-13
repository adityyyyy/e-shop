import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import { NullData } from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}

export default async function Product({ params }: { params: IParams }) {
  const product = await getProductById(params);
  const currentUser = await getCurrentUser();

  if (!product) {
    return <NullData title="Oops! No Product" />;
  }

  return (
    <div>
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={currentUser} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}
