import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import LoginPage from "./pages/login_page";
import AuthLayout from "./layouts/auth_layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
