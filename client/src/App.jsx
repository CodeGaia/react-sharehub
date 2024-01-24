import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/faculty-auth/SignUp";
import SignIn from "./pages/faculty-auth/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
