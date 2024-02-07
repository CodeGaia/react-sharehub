import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/faculty-auth/SignIn";
import SignUp from "./pages/faculty-auth/SignUp";
import Dashboard from "./pages/file-upload/Dashboard";
import LandingPage from "./pages/landing-page/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
