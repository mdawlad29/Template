import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./Contexts/ContextProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultQueryFn } from "./utils/myAxios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      queryFn: defaultQueryFn,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ContextProvider>
            <App />
          </ContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
