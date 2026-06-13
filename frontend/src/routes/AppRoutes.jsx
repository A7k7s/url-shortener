import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {

  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics/:id"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;