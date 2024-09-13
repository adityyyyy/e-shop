import Container from "@/app/components/Container";
import { FormWrap } from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";

export default async function AddProduct() {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}
