import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import { ProtectedRoute } from "./routes/protectedRoutes";
import { Toaster } from "./components/ui/sonner";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
};

export default App;
