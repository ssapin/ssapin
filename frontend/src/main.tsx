import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@emotion/react";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import { themes } from "./styles/theme";
// import { worker } from "./mocks/browser";

// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <ThemeProvider theme={themes}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
