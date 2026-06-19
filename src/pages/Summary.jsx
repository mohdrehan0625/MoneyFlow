import StatsCards from "../components/budget/StatsCards";
import FinancialHealth from "../components/budget/FinancialHealth";
import ExpenseChart from "../components/charts/ExpenseChart";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function Summary() {
  const { expenses } = useContext(ExpenseContext);

  const budget = Number(
    localStorage.getItem("monthlyBudget") || 0
  );

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remaining = budget - totalSpent;

  const percentageUsed = budget
    ? Math.round((totalSpent / budget) * 100)
    : 0;

  return (
    <div className="container">
      <StatsCards />

      <FinancialHealth />

      <div className="card">
        <h2 className="section-title">
          Budget Overview
        </h2>

        <p>
          <strong>Budget:</strong> ₹{budget}
        </p>

        <p>
          <strong>Spent:</strong> ₹{totalSpent}
        </p>

        <p>
          <strong>Remaining:</strong> ₹{remaining}
        </p>

        <p>
          <strong>Usage:</strong>{" "}
          {percentageUsed}% Used
        </p>
      </div>

      <div className="card">
        <h2 className="section-title">
          Spending by Category
        </h2>

        <ExpenseChart />
      </div>
    </div>
  );
}

export default Summary;