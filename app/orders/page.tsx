import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/NullData";
import Container from "@/app/components/Container";
import OrderClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

export default async function Orders() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access Denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No Orders" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
}
