import { Route, Routes } from "react-router-dom";

import ClientLayout from "../layout/ClientLayout";

import Info from "../components/client/info/Info";
import Home from "../components/client/home/Home";
import Genres from "../components/client/genres/Genres";
import Follow from "../components/client/follow/Follow";
import Detail from "../components/client/detail/Detail";
import History from "../components/client/history/History";
import Chapters from "../components/client/chapters/Chapter";
import ScrollToTop from "../components/common/scrollTop/ScrollToTop";
import Comic from "../components/client/comic/Comic";

export default function ClientRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/home" element={<Comic />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/history" element={<History />} />
          <Route path="/detail/:comicId" element={<Detail />} />
          <Route path="/:comicSlug/:chapterId" element={<Chapters />} />
        </Route>
      </Routes>
    </>
  );
}
