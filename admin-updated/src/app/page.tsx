import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { getDashboardStats } from "@/lib/actions/orders";
import { getProducts } from "@/lib/actions/products";
import { getOrders } from "@/lib/actions/orders";
import { Package, Users, ShoppingBag, DollarSign } from "lucide-react";

const StatCard = ({
  label,
  value,
  icon: Icon,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  sub?: string;
}) => (
  <div className="bg-primary-foreground rounded-lg p-4 flex items-center gap-4">
    <div className="p-3 rounded-md bg-secondary">
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  </div>
);

const Homepage = async () => {
  const [stats, products, orders] = await Promise.all([
    getDashboardStats().catch(() => ({
      totalProducts: 0,
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
    })),
    getProducts().catch(() => []),
    getOrders().catch(() => []),
  ]);

  return (
    <div className="space-y-4">
      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={stats.totalProducts} icon={Package} />
        <StatCard label="Total Users" value={stats.totalUsers} icon={Users} />
        <StatCard label="Total Orders" value={stats.totalOrders} icon={ShoppingBag} />
        <StatCard
          label="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          sub="Successful orders only"
        />
      </div>

      {/* ── Charts + Lists ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppBarChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <CardList title="Latest Transactions" orders={orders.slice(0, 5)} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppPieChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <TodoList />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppAreaChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <CardList title="Popular Products" products={products.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
