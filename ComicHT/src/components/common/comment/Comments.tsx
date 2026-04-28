import { Button, Form } from "antd";
import React, { useState } from "react";
import { CommentType } from "../../../types/CommentType";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/authStore";
import { createComment } from "../../../api/commentApi";

interface CommentsProps {
  comicId: number;
  chapterId?: number;
  dataComments: CommentType[];
  setDataComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const Comments: React.FC<CommentsProps> = ({
  dataComments,
  comicId,
  chapterId,
  setDataComments,
}) => {
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const [value, setValue] = useState("");

  const [visibleCount, setVisibleCount] = useState(2);

  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async () => {
    if (!value.trim()) return;
    if (!user?.id) return;
    const newComment = {
      comicId: comicId,
      userId: user.id,
      content: value,
      parentId: replyTo,
      chapterId: chapterId || null,
    };

    try {
      const resCommented = await createComment(newComment);
      const CommentsNew = { ...resCommented, replies: [] };
      setDataComments((prev) =>
        !replyTo
          ? [...prev, CommentsNew]
          : prev.map((comment) =>
              comment.id === replyTo
                ? {
                    ...comment,
                    replies: [...comment.replies, CommentsNew],
                  }
                : {
                    ...comment,
                    replies: comment.replies.map((child) =>
                      child.id === replyTo
                        ? { ...child, replies: [...child.replies, CommentsNew] }
                        : child
                    ),
                  }
            )
      );
      setValue("");
      setReplyTo(null);
    } catch (error) {
      console.log(error);
    }
  };

  function timeSince(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000); // giây

    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;

    return `${Math.floor(diff / 86400)} ngày trước`;
  }

  const renderComments = (comment: CommentType) => {
    return (
      <div className="mb-3 " key={comment.id}>
        <div className="flex text-sm items-center">
          <p className="mr-2 text-orange-300">{comment.nameUser}</p>
          {comment.chapter ? (
            <p className="mr-1" style={{ color: "red" }}>
              Chap {comment.chapter}
            </p>
          ) : (
            <></>
          )}
          <p className="text-gray-400 text-xs">
            {timeSince(comment.updatedAt)}
          </p>
        </div>
        <div className="content-comment bg-white text-lg p-1 font-normal rounded-lg">
          {comment.content}
        </div>
        <div>
          <span
            className="mr-1 ml-3 text-gray-400 text-xs"
            onClick={() => {
              setReplyTo(comment.id);
            }}
          >
            Trả lời
          </span>
          <span className="text-gray-400 text-xs">Chỉnh sửa</span>
        </div>
        {comment.replies.map((children) => (
          <div className="" style={{ marginLeft: "20px" }} key={children.id}>
            <div className="flex text-sm items-center">
              <p className="mr-2 text-orange-300">{children.nameUser}</p>
              {children.chapter ? (
                <p className="mr-1" style={{ color: "red" }}>
                  Chap {children.chapter}
                </p>
              ) : (
                <></>
              )}
              <p className="text-gray-400 text-xs">
                {timeSince(children.updatedAt)}
              </p>
            </div>
            <div className="content-comment bg-white text-lg p-1 font-normal rounded-lg">
              {children.content}
            </div>
            <div>
              <span
                className="mr-1 ml-3 text-gray-400 text-xs"
                onClick={() => {
                  setReplyTo(comment.id);
                }}
              >
                Trả lời
              </span>
              <span className="text-gray-400 text-xs">Chỉnh sửa</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="shadow-xl"
      style={{
        maxWidth: 700,
        margin: "20px auto",
        background: "#cccccc33",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <h2>Bình luận ({dataComments.length})</h2>

      <Form.Item>
        {replyTo && (
          <div style={{ marginBottom: 8 }}>
            Đang trả lời comment ID: {replyTo} —{" "}
            <a onClick={() => setReplyTo(null)}>Hủy</a>
          </div>
        )}
        <TextArea
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Viết bình luận..."
        />
      </Form.Item>
      <Button type="primary" onClick={handleSubmit} disabled={!value.trim()}>
        Gửi
      </Button>

      <div style={{ marginTop: 24 }}>
        {dataComments
          .slice(0, visibleCount)
          .map((comment) => renderComments(comment))}
        {visibleCount < dataComments.length ? (
          <div className="text-center mt-3">
            <Button
              type="link"
              onClick={() => setVisibleCount((prev) => prev + 2)}
            >
              Xem thêm bình luận
            </Button>
          </div>
        ) : (
          <div className="text-center mt-3">
            <Button
              type="link"
              onClick={() => setVisibleCount((prev) => prev - 5)}
            >
              Ản bớt
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
