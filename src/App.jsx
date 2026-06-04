import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Awardees from "./pages/Awardees.jsx";
import AwardeeDetails from "./pages/AwardeeDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";

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
