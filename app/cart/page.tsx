import Container from "../components/Container";
import CartClient from "./CartClient";

export default function Cart() {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
      </Container>
    </div>
  );
}
