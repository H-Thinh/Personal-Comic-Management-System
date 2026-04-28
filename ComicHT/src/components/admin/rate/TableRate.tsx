import { Table } from "antd";
import { Rate, TableProps } from "antd/lib";

import { Rates } from "./RateType";

import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface TableRateProps {
  dataRates: Rates[];
  handleStatusRate: (id: number, comicId: number, userId: number) => void;
}

const TableRate: React.FC<TableRateProps> = ({
  dataRates,
  handleStatusRate,
}) => {
  const columns: TableProps<Rates>["columns"] = [
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
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (_: any, rate: Rates) => {
        return <Rate disabled defaultValue={rate.rating} />;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, rate: Rates) => {
        return rate.status === "active" ? (
          <FaEye
            className="text-green-500 cursor-pointer"
            size={20}
            onClick={() => {
              handleStatusRate(rate.id, rate.comic.id, rate.user.id);
            }}
          />
        ) : (
          <FaEyeSlash
            className="text-gray-400 cursor-pointer"
            size={20}
            onClick={() => {
              handleStatusRate(rate.id, rate.comic.id, rate.user.id);
            }}
          />
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataRates}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default TableRate;
