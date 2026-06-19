import { useState, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "../../styles/expense-form.css";

function ExpenseForm({ showToast })  {
  const { addExpense } = useContext(ExpenseContext);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    description: "",
    recurring: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.amount ||
      !formData.category ||
      !formData.description
    ) {
      setError("Please fill all required fields.");
      return;
    }

    addExpense({
      id: String(Date.now()),
      ...formData,
      amount: Number(formData.amount),
    });
    showToast("✅ Expense added successfully");

    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "",
      description: "",
      recurring: false,
    });

    setError("");
  };

  return (
    <form
      className="expense-form"
      onSubmit={handleSubmit}
    >
      <h2>Add Expense</h2>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount (₹)"
        value={formData.amount}
        onChange={handleChange}
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">
          Select Category
        </option>

        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Health</option>
        <option>Entertainment</option>
        <option>Education</option>
        <option>Utilities</option>
        <option>Other</option>
      </select>

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <label className="checkbox-label">
        <input
          type="checkbox"
          name="recurring"
          checked={formData.recurring}
          onChange={handleChange}
        />
        Recurring Expense
      </label>

      <button
        type="submit"
        className="submit-btn"
      >
        Add Expense
      </button>

      {error && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "14px",
            marginTop: "10px",
            fontWeight: "500",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

export default ExpenseForm;