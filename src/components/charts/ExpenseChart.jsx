import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899", "#14b8a6", "#f97316"];

function ExpenseChart() {
  const { expenses } = useContext(ExpenseContext);
  const [chartType, setChartType] = useState("pie");

  const data = Object.values(
    expenses.reduce((acc, expense) => {
      const cat = expense.category;
      if (!acc[cat]) acc[cat] = { name: cat, value: 0 };
      acc[cat].value += parseFloat(expense.amount);
      return acc;
    }, {})
  );

  if (expenses.length === 0) {
    return <p>No expenses to display.</p>;
  }

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setChartType("pie")}
          style={{ fontWeight: chartType === "pie" ? "bold" : "normal", marginRight: "8px" }}
        >
          🥧 Pie Chart
        </button>
        <button
          onClick={() => setChartType("bar")}
          style={{ fontWeight: chartType === "bar" ? "bold" : "normal" }}
        >
          📊 Bar Chart
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        {chartType === "pie" ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
          </PieChart>
        ) : (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `₹${v}`} />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Bar dataKey="value" name="Amount" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;