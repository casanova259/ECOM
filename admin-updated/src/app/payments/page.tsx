import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getOrders } from "@/lib/actions/orders";

const PaymentsPage = async () => {
  const data = await getOrders().catch(() => []);

  // Flatten joined user fields so columns can access fullName/email directly
  const tableData = data.map((order) => ({
    ...order,
    fullName: order.users?.full_name ?? "Unknown",
    email: order.users?.email ?? "—",
  }));

  return (
    <div>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex items-center justify-between">
        <h1 className="font-semibold">All Payments</h1>
        <span className="text-sm text-muted-foreground">{data.length} orders</span>
      </div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default PaymentsPage;
