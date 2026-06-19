function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <button
        className={`nav-btn ${
          activeTab === "add" ? "active" : ""
        }`}
        onClick={() => setActiveTab("add")}
      >
        Add Expense
      </button>

      <button
        className={`nav-btn ${
          activeTab === "all" ? "active" : ""
        }`}
        onClick={() => setActiveTab("all")}
      >
        Expenses
      </button>

      <button
        className={`nav-btn ${
          activeTab === "summary" ? "active" : ""
        }`}
        onClick={() => setActiveTab("summary")}
      >
        Insights
      </button>
    </nav>
  );
}

export default Navbar;