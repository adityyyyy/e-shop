import prisma from "@/libs/prismadb";

export default async function getOrders() {
  try {
    const orders = prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
}
