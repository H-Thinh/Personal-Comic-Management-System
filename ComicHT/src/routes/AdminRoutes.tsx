import { Route, Routes } from "react-router-dom";

import Chat from "../components/admin/chat/Chat";
import Comic from "../components/admin/comic/Comic";
import Rate from "../components/admin/rate/Rate";
import Genre from "../components/admin/genre/Genre";
import Users from "../components/admin/users/Users";
import Author from "../components/admin/author/Author";
import Chapter from "../components/admin/chapter/Chapter";
import Comment from "../components/admin/comment/Comment";

import AdminLayout from "../layout/AdminLayout";
import ScrollToTop from "../components/common/scrollTop/ScrollToTop";

function AdminRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Comic />} />
          <Route path="rate" element={<Rate />} />
          <Route path="chat" element={<Chat />} />
          <Route path="users" element={<Users />} />
          <Route path="genre" element={<Genre />} />
          <Route path="author" element={<Author />} />
          <Route path="chapter" element={<Chapter />} />
          <Route path="comment" element={<Comment />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
