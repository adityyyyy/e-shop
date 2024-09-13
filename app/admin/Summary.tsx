"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import formatNumber from "@/utils/formatNumber";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

export default function Summary({ orders, products, users }: SummaryProps) {
  const totalSale = orders.reduce((acc, item) => {
    if (item.status === "complete") {
      return acc + item.amount;
    } else {
      return acc;
    }
  }, 0);

  const paidOrders = orders.filter((order) => {
    return order.status === "complete";
  });

  const unpaidOrders = orders.filter((order) => {
    return order.status === "pending";
  });

  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: totalSale,
    },
    products: {
      label: "Total Products",
      digit: products.length,
    },
    orders: {
      label: "Total Orders",
      digit: orders.length,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: paidOrders.length,
    },
    users: {
      label: "Users",
      digit: users.length,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: unpaidOrders.length,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      const tmp = prev;

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else {
          return acc;
        }
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      tmp.sale.digit = totalSale;
      tmp.orders.digit = orders.length;
      tmp.paidOrders.digit = paidOrders.length;
      tmp.unpaidOrders.digit = unpaidOrders.length;
      tmp.products.digit = products.length;
      tmp.users.digit = users.length;

      return tmp;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Total Sale" ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>
                  <div>{summaryData[key].label}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
