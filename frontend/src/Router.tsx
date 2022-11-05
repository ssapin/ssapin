import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TogetherMap from "./pages/TogetherMap/TogetherMapPage";
import NewPlace from "./pages/NewPlace/NewPlacePage";

const Main = lazy(() => import("./pages/Main/MainPage"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
const User = lazy(() => import("./pages/MyPage/MyPage"));
const Search = lazy(() => import("./pages/Search/MapSearchPage"));
// const TogetherMap = lazy(() => import("./pages/TogetherMap/TogetherMapPage"));
const Maps = lazy(() => import("./pages/Map/MapPage"));
// const NewMap = lazy(() => import("./pages/NewPlace/NewPlacePage"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="auth/kakao/login" element={<Login />} />
        <Route path="user" element={<User />} />
        <Route path="search" element={<Search />} />
        <Route
          path="togethermaps/:togethermapId/detail"
          element={<TogetherMap />}
        />
        <Route path="togethermaps/:togethermapId/new" element={<NewPlace />} />
        <Route path="mpas/:mapId/detatil" element={<Maps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
