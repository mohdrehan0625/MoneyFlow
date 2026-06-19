import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import BudgetCard from "../components/budget/BudgetCard";
import Summary from "./Summary";

function Dashboard({ activeTab, showToast }) {
  if (activeTab === "summary") {
    return <Summary />;
  }

  return (
    <div className="container">
      {activeTab === "add" && (
        <>
          <BudgetCard showToast={showToast} />

          <div className="card">
            <ExpenseForm showToast={showToast} />
          </div>
        </>
      )}

      {activeTab === "all" && (
        <div className="card">
          <h2 className="section-title">
            All Expenses
          </h2>

          <ExpenseList showToast={showToast} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;