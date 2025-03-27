import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/dashBoard/DashBoard";
import AuthRoute from "./routes/authRoutes/AuthRoute";
import Layout from "@/components/layout/Layout";
import Features from "@/components/features/Features";

function App() {
  return (
    <div className="bg-accent-1 dark:bg-accent-8">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <DashBoard />
              <Features />
            </Layout>
          }
        />
      </Routes>
      {/* authentication routes e.g (login,register,etc) */}
      <AuthRoute />
    </div>
  );
}

export default App;
