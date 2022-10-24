import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Main = lazy(() => import("./pages/Main/MainPage"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
