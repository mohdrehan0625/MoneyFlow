import { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";

function FinancialHealth() {
  const { expenses } = useContext(ExpenseContext);

  const budget = Number(
    localStorage.getItem("monthlyBudget") || 0
  );

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  let score = 100;

  if (budget > 0) {
    score = Math.max(
      0,
      Math.round(
        ((budget - totalSpent) / budget) * 100
      )
    );
  }

  let status = "Excellent";

  if (score < 90) status = "Good";
  if (score < 70) status = "Average";
  if (score < 50) status = "Needs Attention";

  return (
    <div className="card">
      <h2 className="section-title">
        Financial Health Score
      </h2>

      <div className="health-score">
        <h1>{score}/100</h1>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default FinancialHealth;