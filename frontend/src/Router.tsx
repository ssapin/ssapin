import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Main = lazy(() => import("./pages/Main/MainPage"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
const User = lazy(() => import("./pages/MyPage/MyPage"));
const Search = lazy(() => import("./pages/Search/MapSearchPage"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/auth/kakao/login" element={<Login />} />
        <Route path="user" element={<User />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
