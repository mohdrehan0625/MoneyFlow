import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <>
      <Header />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main">
        <Dashboard activeTab={activeTab} />
      </main>
    </>
  );
}

export default App;