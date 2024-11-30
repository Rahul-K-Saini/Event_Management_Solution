import { getUser } from "@/lib/dal";
import { user } from "@/types/user";
import { redirect } from "next/navigation";
import { UserDashboard } from "./_components/userDashboard";
import { CompanyDashboard } from "./_components/companyDashboard";

export default async function DashBoard() {
  const user: user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  if (user.role === "user") {
    return <UserDashboard />;
  }

  if (user.role === "company") {
    return <CompanyDashboard />;
  }
}
