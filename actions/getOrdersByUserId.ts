import prisma from "@/libs/prismadb";

export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: userId,
      },
    });

    return orders;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
}
