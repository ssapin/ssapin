import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateMapMobilePage from "./pages/CreateMap/CreateMapMobilePage";
import SharedPlaceDetail from "./pages/Place/SharedPlaceDetailPage";

const Main = lazy(() => import("./pages/Main/MainPage"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
const User = lazy(() => import("./pages/MyPage/MyPage"));
const TogetherMap = lazy(() => import("./pages/TogetherMap/TogetherMapPage"));
const Maps = lazy(() => import("./pages/Map/MapPage"));
const TogetherNewPlace = lazy(
  () => import("./pages/NewPlace/TogetherNewPlacePage"),
);
const MapNewPlace = lazy(() => import("./pages/NewPlace/MapNewPlacePage"));
const Search = lazy(() => import("./pages/Search/MapSearchPage"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="auth/kakao/login" element={<Login />} />
        <Route
          path="togethermaps/:togethermapId/detail"
          element={<TogetherMap />}
        />
        <Route
          path="togethermaps/:togethermapId/new"
          element={<TogetherNewPlace />}
        />
        <Route path="maps/:mapId/new" element={<MapNewPlace />} />
        <Route path="maps/:mapId/detail" element={<Maps />} />
        <Route path="mypage" element={<User />} />
        <Route path="search" element={<Search />} />
        <Route path="mobilecreate" element={<CreateMapMobilePage />} />
        <Route path="place/:placeId" element={<SharedPlaceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
