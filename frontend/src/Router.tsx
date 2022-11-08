import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TogetherMap from "./pages/TogetherMap/TogetherMapPage";
import SearchPage from "./pages/Search/MapSearchPage";
import MainPage from "./pages/Main/MainPage";
import MyPage from "./pages/MyPage/MyPage";
import CreateMapMobilePage from "./pages/CreateMap/CreateMapMobilePage";

// const Main = lazy(() => import("./pages/Main/MainPage"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
const User = lazy(() => import("./pages/MyPage/MyPage"));
// const Search = lazy(() => import("./pages/Search/MapSearchPage"));
// const TogetherMap = lazy(() => import("./pages/TogetherMap/TogetherMapPage"));
const Maps = lazy(() => import("./pages/Map/MapPage"));
// const User = lazy(() => import("./pages/MyPage/MyPage"));
// const Search = lazy(() => import("./pages/Search/MapSearchPage"));


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="auth/kakao/login" element={<Login />} />
        <Route path="user" element={<User />} />
        <Route
          path="togethermaps/:togethermapId/detail"
          element={<TogetherMap />}
        />
        <Route path="togethermaps/:togethermapId/new" element={<NewPlace />} />
        <Route path="mpas/:mapId/detatil" element={<Maps />} />
        <Route path="" element={<MainPage />} />
        <Route path="/auth/kakao/login" element={<Login />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="mobileCreate" element={<CreateMapMobilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
