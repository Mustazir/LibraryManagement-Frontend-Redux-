import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-Provider.tsx";
import { store } from "./redux/store";
import { RouterProvider } from "react-router";
import router from "./routes/router.tsx";

import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
