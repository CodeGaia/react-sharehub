import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/faculty-auth/SignUp";
import SignIn from "./pages/faculty-auth/SignIn";
import Dashboard from "./pages/file-upload/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
