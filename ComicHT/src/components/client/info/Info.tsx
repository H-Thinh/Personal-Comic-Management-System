import { useSelector } from "react-redux";
import { RootState } from "../../../redux/authStore";
import { useEffect, useState } from "react";
import { getUserById } from "../../../api/userApi";
import { User } from "../../../types/User";
import { CiEdit } from "react-icons/ci";

export default function Info() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [dataUser, setDataUser] = useState<User>({} as User);

  const [isEditing, setIsEditing] = useState(false);

  const [active, setActive] = useState<"info" | "password">("info");

  const [input, setInput] = useState({
    name: "",
    email: "",
    passwordOld: "",
    passwordNew: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserById(user?.id || 0);
        setDataUser(res);
        setInput((prev) => ({ ...prev, name: res.name, email: res.email }));
      } catch (err) {
        console.error("Lỗi lấy thông tin user:", err);
      }
    })();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const fields =
    active === "info"
      ? [
          { label: "Tên đăng nhập", name: "name", type: "text" },
          { label: "Email", name: "email", type: "text" },
        ]
      : [
          { label: "Mật khẩu hiện tại", name: "passwordOld", type: "password" },
          { label: "Mật khẩu mới", name: "passwordNew", type: "password" },
          {
            label: "Nhập lại mật khẩu",
            name: "passwordConfirm",
            type: "password",
          },
        ];

  return (
    <div className="container">
      <div className="flex p-4">
        <div className="w-80 bg-gray-200 rounded-xl text-center p-4">
          <p className="font-semibold">{dataUser.name}</p>
          <p className="text-yellow-700">{dataUser.email}</p>

          <div className="flex justify-around text-sm mt-4">
            {[
              ["24", "Sách đã đọc"],
              ["2", "Đánh giá"],
              ["2", "Yêu thích"],
            ].map(([n, label]) => (
              <div key={label}>
                <p className="text-blue-700">{n}</p>
                <p>{label}</p>
              </div>
            ))}
          </div>

          <div className="w-48 bg-white rounded-lg p-2 mt-4 flex flex-col gap-2">
            {["info", "password"].map((k) => (
              <span
                key={k}
                onClick={() => setActive(k as any)}
                className={`p-1 w-full rounded-lg cursor-pointer transition-all ${
                  active === k ? "bg-red-300 text-white" : "hover:bg-gray-100"
                }`}
              >
                {k === "info" ? "Thông tin cá nhân" : "Thay đổi mật khẩu"}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 ml-6 bg-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center border-b-2 border-red-300 pb-2">
            <h3 className="text-xl font-bold">
              {active === "info" ? "Thông tin cá nhân" : "Thay đổi mật khẩu"}
            </h3>
            {active === "info" && (
              <span
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center cursor-pointer text-blue-400 text-sm"
              >
                <CiEdit className="mr-2" />
                {isEditing ? "Lưu" : "Chỉnh sửa"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            {fields.map(({ label, name, type }) => (
              <div key={name}>
                <p className="mb-1">{label}</p>
                <input
                  type={type}
                  name={name}
                  value={(input as any)[name]}
                  onChange={handleInput}
                  disabled={active === "info" && !isEditing}
                  className={`bg-white w-full p-1 rounded ${
                    isEditing && active === "info"
                      ? "border border-blue-400"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
