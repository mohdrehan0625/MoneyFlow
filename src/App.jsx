import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Toast from "./components/common/Toast";

function App() {
  const [activeTab, setActiveTab] = useState("add");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  return (
    <>
      <Toast message={toastMessage} />

      <Header />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="main">
        <Dashboard
          activeTab={activeTab}
          showToast={showToast}
        />
      </main>
    </>
  );
}

export default App;