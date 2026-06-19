import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import BudgetCard from "../components/budget/BudgetCard";
import Summary from "./Summary";

function Dashboard({ activeTab }) {
  if (activeTab === "summary") {
    return <Summary />;
  }

  return (
    <div className="container">
      {activeTab === "add" && (
        <>
          <BudgetCard />

          <div className="card">
            <ExpenseForm />
          </div>
        </>
      )}

      {activeTab === "all" && (
        <div className="card">
          <h2 className="section-title">
            All Expenses
          </h2>

          <ExpenseList />
        </div>
      )}
    </div>
  );
}

export default Dashboard;