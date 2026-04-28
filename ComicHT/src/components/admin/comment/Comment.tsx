import "./Comment.css";
import { GrHide } from "react-icons/gr";
import TableComment from "./TableComment";
import { useEffect, useState } from "react";
import { getComments, UpdateStatusForComment } from "../../../api/commentApi";
import { Comments } from "./CommentType";

function Comment() {
  const [dataComments, setDataComments] = useState<Comments[]>([]);

  useEffect(() => {
    const getCommentsApi = async () => {
      try {
        const resComments = await getComments();
        console.log(resComments);

        setDataComments(resComments);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentsApi();
  }, []);

  const handleStatusRate = async (
    id: number,
    comicId: number,
    userId: number
  ) => {
    try {
      const resUpdatedStatus = await UpdateStatusForComment(id, {
        comicId,
        userId,
      });
      setDataComments((prev) => {
        return prev.map((p) =>
          p.id === id ? { ...p, status: resUpdatedStatus.status } : p
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="category-management">
        <h2 className="section-title">Quản lý bình luận</h2>
        <TableComment
          dataComments={dataComments}
          handleStatusRate={handleStatusRate}
        />
      </section>
    </>
  );
}

export default Comment;
