import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter.tsx";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <>
        <AppRouter />
        <Toaster position="top-right" richColors />
    </>
);
