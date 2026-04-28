import React from "react";
import { Comments } from "./CommentType";
import { Table } from "antd";
import { TableProps } from "antd/lib";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface TableCommentProps {
  dataComments: Comments[];
  handleStatusRate: (id: number, comicId: number, userId: number) => void;
}

const TableComment: React.FC<TableCommentProps> = ({
  dataComments,
  handleStatusRate,
}) => {
  const columns: TableProps<Comments>["columns"] = [
    {
      title: "Tên sách",
      dataIndex: "title",
      key: "title",
      render: (_, record) => record.comic.title,
    },
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (_, record) => record.user.name,
    },
    {
      title: "Nội dụng",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, comment: Comments) => {
        return comment.status === "active" ? (
          <FaEye
            className="text-green-500 cursor-pointer"
            size={20}
            onClick={() => {
              handleStatusRate(comment.id, comment.comic.id, comment.user.id);
            }}
          />
        ) : (
          <FaEyeSlash
            className="text-gray-400 cursor-pointer"
            size={20}
            onClick={() => {
              handleStatusRate(comment.id, comment.comic.id, comment.user.id);
            }}
          />
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataComments}
      style={{ width: 1000, margin: "auto" }}
    />
  );
};

export default TableComment;
