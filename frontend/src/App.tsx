import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import QuizPage from "./pages/QuizPage";
import EditQuizPage from "./pages/EditQuizPage";
import AppDataProvider from "./contexts/AppContext/AppDataProvider";
import Auth from "./contexts/AppContext/Auth";

export default function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />

          <Route
            path="/dashboard"
            element={
              <Auth>
                <DashboardPage />
              </Auth>
            }
          />
          <Route
            path="/quiz/:quizId/edit"
            element={
              <Auth>
                <EditQuizPage />
              </Auth>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppDataProvider>
  );
}
