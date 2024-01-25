import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/faculty-auth/SignUp";
import SignIn from "./pages/faculty-auth/SignIn";
import UploadPage from "./pages/main/UploadPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </>
  );
}

export default App;
