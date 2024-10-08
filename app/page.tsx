export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import { NullData } from "./components/NullData";
import { Product } from "@prisma/client";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  let frag: React.ReactNode;

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const shuffledProducts = shuffleArray(products);

  if (products.length === 0) {
    frag = (
      <NullData title="Oops! No products found. Click 'All' to clear filters" />
    );
  } else {
    frag = (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {shuffledProducts.map((product: Product) => {
          return <ProductCard key={product.id} data={product} />;
        })}
      </div>
    );
  }

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        {frag}
      </Container>
    </div>
  );
}
