import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrders from "@/actions/getOrders";
import { NullData } from "@/app/components/NullData";
import ManageOrderClient from "./ManageOrderClient";
import Container from "@/app/components/Container";

export default async function ManageOrders() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  const orders = await getOrders();

  return (
    <div className="pt-8">
      <Container>
        <ManageOrderClient orders={orders} />
      </Container>
    </div>
  );
}
