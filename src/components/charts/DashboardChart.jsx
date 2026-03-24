import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = ({ data = [] }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatted = data.map((item) => ({
    month: months[item.month - 1] ?? item.month,
    revenue: item.revenue,
    orders: item.orders,
    users: item.users,
  }));

  return (
    <>
      {/* Users */}
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={formatted}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="users" fill="#ffc658" stroke="#ffc658" />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Revenue */}
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={formatted}>
          <XAxis dataKey="month" />
          <YAxis width={80} />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Orders */}
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={formatted}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="orders" fill="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardChart;
