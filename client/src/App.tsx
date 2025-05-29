import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import PortfolioPage from "./pages/PortfolioPage";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
