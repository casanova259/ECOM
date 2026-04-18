import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getUsers } from "@/lib/actions/users";

const UsersPage = async () => {
  const data = await getUsers().catch(() => []);

  return (
    <div>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md flex items-center justify-between">
        <h1 className="font-semibold">All Users</h1>
        <span className="text-sm text-muted-foreground">{data.length} users</span>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UsersPage;
