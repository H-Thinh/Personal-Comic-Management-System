import "./Users.css";
import React, { useEffect, useState } from "react";

import { FaUserEdit } from "react-icons/fa";

import { useToast } from "../../../context/ToastContext";

import FormUser from "./FormUser";
import TableUsers from "./TableUsers";

import {
  deletetUserById,
  getUserById,
  getUsers,
  registerUser,
  updateUserById,
} from "../../../api/adminApi";
import { getRoles } from "../../../api/roleApi";
import { getPermissions } from "../../../api/permission";

import { User } from "../../../types/User";
import { InterfaceDefault } from "../../../types/InterfaceDefault";

function Users() {
  const [dataUsers, setDataUsers] = useState<User[]>([]);

  const [inputs, setInputs] = useState<{
    name: string;
    password: string;
    email: string;
    role: string;
  }>({
    name: "",
    password: "",
    email: "",
    role: "0",
  });

  const [selectPermissions, setSelectPermissions] = useState<number[]>([]);

  const [isEdit, setIsEdit] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [id, setId] = useState<number | undefined>();

  const { showToast } = useToast();

  const [dataPermissions, setDataPermissions] = useState<InterfaceDefault[]>(
    []
  );

  const [dataRoles, setDataRoles] = useState<InterfaceDefault[]>([]);

  useEffect(() => {
    const getDataForAdmin = async () => {
      try {
        const [resPermissions, resRoles, resUsers] = await Promise.all([
          getPermissions(),
          getRoles(),
          getUsers(),
        ]);

        setDataPermissions(resPermissions);
        setDataRoles(resRoles);
        setDataUsers(resUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getDataForAdmin();
  }, []);

  function cancelFormUser() {
    setIsModalOpen(false);
    resetInputs();
  }

  function handleChangeInputs(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectPermission(id: number) {
    setSelectPermissions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function resetInputs() {
    setSelectPermissions([]);
    setInputs({ name: "", email: "", password: "", role: "0" });
    setId(undefined);
    setIsEdit(false);
    setIsModalOpen(false);
  }

  const handleSubmitUser = async () => {
    const { name, email, password, role } = inputs;
    const isValid =
      name.trim() !== "" &&
      email.trim() !== "" &&
      (isEdit || password.trim() !== "") &&
      role !== "";

    if (!isValid) {
      showToast("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    const data: {
      name: string;
      email: string;
      password: string;
      roleId: string;
      permissionIds: number[];
    } = {
      name,
      email,
      password,
      roleId: inputs.role,
      permissionIds: selectPermissions,
    };

    if (isEdit && id !== undefined) {
      try {
        const updateUser = await updateUserById(id, data);
        setDataUsers((prev) =>
          prev.map((user) => (user.id === updateUser.id ? updateUser : user))
        );
        resetInputs();
        showToast("Chỉnh sửa thành công", "success");
      } catch (error) {
        showToast("Cập nhật thất bại", "error");
      }
    } else {
      try {
        const createuser = await registerUser(data);
        setDataUsers((prev) => [...prev, createuser]);
        showToast("Thêm người dùng thành công", "success");
        resetInputs();
      } catch (error) {
        showToast("Thêm người dùng thất bại", "error");
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deletetUserById(id);
      setDataUsers((prev) => prev.filter((user) => user.id !== id));
      showToast("Xóa user thành công", "success");
    } catch (error) {
      showToast("Xóa user thất bại", "error");
    }
  };

  const handleEditUser = async (id: number) => {
    try {
      const getUser = await getUserById(id);
      setInputs({
        name: getUser.name,
        email: getUser.email,
        password: "",
        role: String(getUser.role.id),
      });
      setId(getUser.id);
      setIsEdit(true);
      setSelectPermissions(getUser.upermission);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="table-container"
      style={{
        width: "100%",
        margin: "20px",
        boxShadow: "1px 1px 5px 1px #ccc",
      }}
    >
      <div className="table-header">
        <h3 className="text-xl">Danh sách người dùng</h3>

        <button
          className="w-[80]"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <FaUserEdit />
          <p className="ml-2">Thêm</p>
        </button>
      </div>

      <FormUser
        inputs={inputs}
        isEdit={isEdit}
        dataRoles={dataRoles}
        isModalOpen={isModalOpen}
        dataPermissions={dataPermissions}
        selectPermissions={selectPermissions}
        cancelFormUser={cancelFormUser}
        handleSubmitUser={handleSubmitUser}
        handleChangeInputs={handleChangeInputs}
        setSelectPermissions={setSelectPermissions}
        handleSelectPermission={handleSelectPermission}
      />

      <TableUsers
        dataUsers={dataUsers}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}

export default Users;
