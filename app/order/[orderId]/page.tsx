import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import { NullData } from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}

export default async function Order({ params }: { params: IParams }) {
  const order = await getOrderById(params);

  if (!order) {
    return <NullData title="No Order" />;
  }
  return (
    <div>
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
}
