/* eslint-disable import/extensions */
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import CreateMapMobilePage from "./pages/CreateMap/CreateMapMobilePage";
import SharedPlaceDetail from "./pages/Place/SharedPlaceDetailPage";
import { authState } from "./store/atom";

const Main = lazy(() => import("./pages/Main/MainPage"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
const User = lazy(() => import("./pages/MyPage/MyPage"));
const TogetherMap = lazy(
  () => import("./pages/TogetherMap/TogetherMapPage.js"),
);
const Maps = lazy(() => import("./pages/Map/MapPage.js"));
const TogetherNewPlace = lazy(
  () => import("./pages/NewPlace/TogetherNewPlacePage"),
);
const MapNewPlace = lazy(() => import("./pages/NewPlace/MapNewPlacePage"));
const Search = lazy(() => import("./pages/Search/MapSearchPage"));

function Router() {
  const loggedIn = useRecoilValue(authState);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="auth/kakao/login" element={<Login />} />
        <Route
          path="togethermaps/:togethermapId/detail"
          element={<TogetherMap />}
        />
        <Route path="maps/:mapId/detail" element={<Maps />} />

        <Route path="mobilecreate" element={<CreateMapMobilePage />} />
        <Route path="places/:placeId" element={<SharedPlaceDetail />} />
        <Route path="search" element={<Search />} />
        <Route element={<ProtectedRoute isLoggedIn={!!loggedIn.accessToken} />}>
          <Route
            path="togethermaps/:togethermapId/new"
            element={<TogetherNewPlace />}
          />
          <Route path="maps/:mapId/new" element={<MapNewPlace />} />
          <Route path="mypage" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
