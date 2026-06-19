import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "../../styles/expense-list.css";

function ExpenseList({ showToast }) {
  const { expenses, deleteExpense, editExpense } = useContext(ExpenseContext);

  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filterCategory, setFilterCategory] = useState("all");

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  const handleEditSave = (id) => {
    editExpense(id, {
      ...editForm,
      amount: parseFloat(editForm.amount),
    });

    showToast("✅ Expense updated successfully");

    setEditingId(null);
    setEditForm({});
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const filteredExpenses = expenses.filter((expense) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      expense.description.toLowerCase().includes(term) ||
      expense.category.toLowerCase().includes(term) ||
      String(expense.amount).includes(term);

    const matchesCategory =
      filterCategory === "all" ||
      expense.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedExpenses = [...filteredExpenses];

  if (sortBy === "newest")
    sortedExpenses.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

  if (sortBy === "oldest")
    sortedExpenses.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

  if (sortBy === "high")
    sortedExpenses.sort(
      (a, b) => b.amount - a.amount
    );

  if (sortBy === "low")
    sortedExpenses.sort(
      (a, b) => a.amount - b.amount
    );

  const exportToCSV = () => {
    const headers = [
      "Description",
      "Amount",
      "Category",
      "Date",
      "Recurring",
    ];

    const rows = sortedExpenses.map((e) => [
      e.description,
      e.amount,
      e.category,
      e.date,
      e.recurring ? "Yes" : "No",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((val) => `"${val}"`).join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "expenses.csv"
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>
          💸 No expenses yet. Add one to
          get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="list-controls">
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(
              e.target.value
            )
          }
        >
          <option value="all">
            All Categories
          </option>

          {[
            ...new Set(
              expenses.map(
                (e) => e.category
              )
            ),
          ].map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="high">
            Amount: High → Low
          </option>

          <option value="low">
            Amount: Low → High
          </option>
        </select>

        <button
          className="export-btn"
          onClick={exportToCSV}
        >
          📥 Export CSV
        </button>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="empty-state">
          <p>
            No expenses match your
            search.
          </p>
        </div>
      ) : (
        sortedExpenses.map((expense) => (
          <div
            key={expense.id}
            className="expense-item"
          >
            {editingId === expense.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={
                    editForm.description
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description:
                        e.target.value,
                    })
                  }
                  placeholder="Description"
                />

                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      amount:
                        e.target.value,
                    })
                  }
                  placeholder="Amount"
                />

                <input
                  type="text"
                  value={
                    editForm.category
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      category:
                        e.target.value,
                    })
                  }
                  placeholder="Category"
                />

                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      date:
                        e.target.value,
                    })
                  }
                />

                <div className="edit-form-actions">
                  <button
                    className="save-btn"
                    onClick={() =>
                      handleEditSave(
                        expense.id
                      )
                    }
                  >
                    Save
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={
                      handleEditCancel
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="expense-item-left">
                  <div className="expense-title">
                    {expense.description}
                  </div>

                  <div className="expense-meta-row">
                    <span className="expense-category-badge">
                      {expense.category}
                    </span>

                    <span className="expense-meta">
                      📅 {expense.date}
                    </span>

                    {expense.recurring && (
                      <span className="expense-meta">
                        🔁 Recurring
                      </span>
                    )}
                  </div>
                </div>

                <div className="expense-amount">
                  ₹
                  {expense.amount.toLocaleString()}
                </div>

                <div className="expense-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEditClick(
                        expense
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      const confirmed =
                        window.confirm(
                          "Delete this expense?"
                        );

                      if (confirmed) {
                        deleteExpense(
                          expense.id
                        );

                        showToast(
                          "🗑 Expense deleted successfully"
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;