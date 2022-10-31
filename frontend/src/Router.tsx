import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Main = lazy(() => import("./pages/Main/MainPage"));
const User = lazy(() => import("./pages/MyPage/MyPage"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
