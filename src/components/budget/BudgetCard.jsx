import { useState } from "react";

function BudgetCard() {
  const [budget, setBudget] = useState(
    localStorage.getItem("monthlyBudget") || ""
  );

  const saveBudget = () => {
    localStorage.setItem("monthlyBudget", budget);

    alert("Monthly budget saved successfully!");
  };

  return (
    <div className="card">
      <h2 className="section-title">
        Monthly Budget
      </h2>

      <div className="budget-form">
        <input
          type="number"
          placeholder="Enter monthly budget"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        />

        <button onClick={saveBudget}>
          Save Budget
        </button>
      </div>
    </div>
  );
}

export default BudgetCard;