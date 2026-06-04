import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Awardees from "./pages/Awardees";
import AwardeeDetails from "./pages/AwardeeDetails";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/awardees" element={<Awardees />} />
          <Route path="/awardees/:slug" element={<AwardeeDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
