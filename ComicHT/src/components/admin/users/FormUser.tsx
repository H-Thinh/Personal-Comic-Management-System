import { Modal, Form, Checkbox, Select } from "antd";
import React from "react";
import { InterfaceDefault } from "../../../types/InterfaceDefault";
import { CheckboxProps } from "antd/lib";

interface FormUserProps {
  inputs: {
    name: string;
    password: string;
    email: string;
    role: string;
  };
  isModalOpen: boolean;
  isEdit: boolean;
  selectPermissions: number[];
  dataRoles: InterfaceDefault[];
  dataPermissions: InterfaceDefault[];
  setSelectPermissions: React.Dispatch<React.SetStateAction<number[]>>;
  cancelFormUser: () => void;
  handleChangeInputs: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmitUser: () => void;
  handleSelectPermission: (id: number) => void;
}

const FormUser: React.FC<FormUserProps> = ({
  isEdit,
  inputs,
  dataRoles,
  isModalOpen,
  dataPermissions,
  selectPermissions,
  cancelFormUser,
  handleSubmitUser,
  handleChangeInputs,
  handleSelectPermission,
  setSelectPermissions,
}) => {
  const checkAll = selectPermissions.length === dataPermissions.length;

  const indeterminate =
    selectPermissions.length > 0 &&
    selectPermissions.length < dataPermissions.length;

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setSelectPermissions(
      e.target.checked ? dataPermissions.map((permission) => permission.id) : []
    );
  };

  return (
    <Modal
      title="Form User"
      open={isModalOpen}
      onCancel={cancelFormUser}
      okText={isEdit ? "Cập nhật người dùng" : "Thêm người dùng"}
      cancelText="Hủy"
      onOk={handleSubmitUser}
    >
      <Form
        name="basic"
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600, marginTop: 20 }}
      >
        <Form.Item>
          <input
            type="text"
            name="name"
            placeholder="Tên người dùng"
            onChange={handleChangeInputs}
            value={inputs.name}
          />
        </Form.Item>

        <Form.Item>
          <input
            type="text"
            name="password"
            placeholder="Nhập mật khẩu"
            onChange={handleChangeInputs}
            value={inputs.password}
          />
        </Form.Item>

        <Form.Item>
          <input
            type="text"
            name="email"
            placeholder="Nhập email"
            onChange={handleChangeInputs}
            value={inputs.email}
          />
        </Form.Item>

        <Form.Item>
          <Select
            className="mb-2 w-80"
            placeholder="Vui lòng chọn role"
            value={inputs.role === "0" ? undefined : inputs.role}
            onChange={(value) =>
              handleChangeInputs({
                target: { name: "role", value } as unknown as EventTarget & {
                  name: string;
                  value: string | number;
                },
              } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
            }
          >
            {dataRoles.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <div>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check All
            </Checkbox>
          </div>
          {dataPermissions.map((permission) => (
            <Checkbox
              key={permission.id}
              checked={selectPermissions.includes(permission.id)}
              onChange={() => handleSelectPermission(permission.id)}
              style={{ width: 180, marginRight: 8 }}
            >
              {permission.name}
            </Checkbox>
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormUser;
