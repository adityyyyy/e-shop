import { getCurrentUser } from "@/actions/getCurrentUser";
import { AdminNav } from "../components/admin/AdminNav";
import { NullData } from "../components/NullData";

export const metadata = {
  title: "E-Shop Admin",
  description: "E-Shop Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}
