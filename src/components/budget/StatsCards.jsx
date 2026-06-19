import { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "../../styles/stats-cards.css";

function StatsCards() {
  const { expenses } = useContext(ExpenseContext);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalExpenses = expenses.length;
  const totalCategories = new Set(expenses.map((expense) => expense.category)).size;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Spent</h3>
        <p>₹{totalSpent}</p>
      </div>
      <div className="stat-card">
        <h3>Expenses</h3>
        <p>{totalExpenses}</p>
      </div>
      <div className="stat-card">
        <h3>Categories</h3>
        <p>{totalCategories}</p>
      </div>
    </div>
  );
}

export default StatsCards;