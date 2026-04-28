import { Popover, Table, Tag } from "antd";
import type { TableProps } from "antd";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { User } from "../../../types/User";
import React, { useState } from "react";
import Search from "antd/es/input/Search";

interface TableUsersProps {
  handleEditUser: (id: number) => void;
  handleDeleteUser: (id: number) => void;
  dataUsers: User[];
}

const TableUsers: React.FC<TableUsersProps> = ({
  handleEditUser,
  handleDeleteUser,
  dataUsers,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const filteredData = dataUsers.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableProps<User>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "vai trò",
      dataIndex: "role",
      key: "role",
      render: (_: any, { role }: { role: string }) => {
        let color: string;
        if (role === "user") {
          color = "red";
        } else {
          color = "green";
        }
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, user: User) => {
        return (
          <div
            className="btn-icon"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <FaEdit size={22} onClick={() => handleEditUser(user.id)} />
            <MdDelete size={25} onClick={() => handleDeleteUser(user.id)} />
          </div>
        );
      },
    },
    {
      title: "Quyền",
      dataIndex: "upermission",
      key: "upermission",
      render: (upermission: [string]) => {
        const visible = upermission.slice(0, 2);

        const hidden = upermission.slice(2);

        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {visible.map((p) => (
              <Tag key={p}>{p}</Tag>
            ))}
            {hidden.length > 0 && (
              <Popover
                content={hidden.map((p) => (
                  <Tag key={p}>{p}</Tag>
                ))}
              >
                <Tag color="purple">+{hidden.length} more</Tag>
              </Popover>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Search
        placeholder="Tìm kiếm theo tên..."
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16, marginTop: 10 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 10,
        }}
        style={{ width: 1000, margin: "auto" }}
      />
    </>
  );
};

export default TableUsers;
