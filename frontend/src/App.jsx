import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import ContactForm from "./ContactForm"; // rename old App form

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
