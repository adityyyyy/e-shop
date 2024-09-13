import Container from "@/app/components/Container";
import React from "react";
import ManageProductClient from "./ManageProductClient";
import getProducts from "@/actions/getProducts";

export default async function ManageProducts() {
  const products = await getProducts({ category: null });
  return (
    <Container>
      <ManageProductClient products={products} />
    </Container>
  );
}
