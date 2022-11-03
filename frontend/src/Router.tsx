import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/Search/MapSearchPage";
import MainPage from "./pages/Main/MainPage";
import MyPage from "./pages/MyPage/MyPage";

// const Main = lazy(() => import("./pages/Main/MainPage"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
// const User = lazy(() => import("./pages/MyPage/MyPage"));
// const Search = lazy(() => import("./pages/Search/MapSearchPage"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/auth/kakao/login" element={<Login />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
