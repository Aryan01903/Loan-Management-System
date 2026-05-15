"use client";

import Protected from "@/components/custom/ProtectedRoute";
import AboutUs from "@/components/pages/Home/AboutUs";
import AdminDashboard from "@/components/pages/Home/Dashboard/Admin";
import BorrowerDashboard from "@/components/pages/Home/Dashboard/Borrower";
import CollectionDashboard from "@/components/pages/Home/Dashboard/Collection";
import DisbursementDashboard from "@/components/pages/Home/Dashboard/Disbursement";
import SalesDashboard from "@/components/pages/Home/Dashboard/Sales";
import SanctionDashboard from "@/components/pages/Home/Dashboard/Sanction";
import { useAuth } from "@/utils/store/authStore";

export default function HomePage() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case "borrower":
        return <BorrowerDashboard />;
      case "admin":
        return <AdminDashboard />;
      case "collection":
        return <CollectionDashboard />;
      case "sanction":
        return <Protected roles={["admin", "sanction"]}> <SanctionDashboard /> </Protected>;
      case "disbursement":
        return <DisbursementDashboard />;
      case "sales":
        return <SalesDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 px-[6%] pb-10">
      {!user ? (
        <div className="flex items-center justify-center h-[20vh] text-gray-500">
          Please login to access dashboard
        </div>
      ) : (
        <div className="mb-6 md:mb-10">
          <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200 mb-5 md:mb-8 text-zinc-600">
            <h2 className="text-xl font-semibold mb-4 text-zinc-700">
              👤 User Details
            </h2>

            <div className="flex flex-wrap justify-between gap-4 text-base md:text-lg">
              <p>
                <span className="font-medium text-gray-800">Name:</span>{" "}
                {user.name}
              </p>

              <p>
                <span className="font-medium text-gray-800">Email:</span>{" "}
                {user.email}
              </p>

              <p>
                <span className="font-medium text-gray-800">Role:</span>{" "}
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-sm uppercase">
                  {user.role}
                </span>
              </p>
            </div>
          </div>

          {renderDashboard()}
        </div>
      )}

      <AboutUs />
    </div>
  );
}