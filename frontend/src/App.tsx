import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { FeedbackListPage } from "./pages/FeedbackListPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppShell />}>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/feedbacks/lista"
                        element={<FeedbackListPage />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
