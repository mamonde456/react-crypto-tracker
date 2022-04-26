import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import App from "./App";
import { dark, light } from "./thema";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const ThemeBtn = styled.div`
  width: 180px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.themeColor};
  color: ${(props) => props.theme.contentsTextColor};
  border-radius: 0px 0px 10px 10px;
`;

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dark}>
        <ThemeBtn>chanege color mode</ThemeBtn>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
