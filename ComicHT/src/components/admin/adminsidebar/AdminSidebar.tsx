import "./AdminSidebar.css";
import {
  FaUsers,
  FaTags,
  FaPen,
  FaStar,
  FaBook,
  FaUserShield,
} from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoIosLogOut,
} from "react-icons/io";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrChapterAdd } from "react-icons/gr";
import axios from "axios";
import { useToast } from "../../../context/ToastContext";
import { Switch } from "antd";
import { FaMessage } from "react-icons/fa6";

function AdminSidebar() {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState<number | null>(() => {
    const stored = localStorage.getItem("isActive") || 1;
    return stored ? Number(stored) : null;
  });

  const [isActiveSon, setIsActiveSon] = useState<number | null>(() => {
    const stored = localStorage.getItem("isActiveSon");
    return stored ? Number(stored) : null;
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem("isDropdownOpen");
    return stored === "true";
  });

  const { showToast } = useToast();

  function handleClick(index: number) {
    setIsActive(index);
    setIsActiveSon(null);
    localStorage.setItem("isActive", String(index));
    localStorage.removeItem("isActiveSon");
  }

  function handleClickSon(parentIndex: number, sonIndex: number) {
    setIsActive(parentIndex);
    setIsActiveSon(sonIndex);
    localStorage.setItem("isActive", String(parentIndex));
    localStorage.setItem("isActiveSon", String(sonIndex));
  }

  const toggleDropdown = () => {
    const newValue = !isDropdownOpen;
    setIsDropdownOpen(newValue);
    localStorage.setItem("isDropdownOpen", String(newValue));
  };

  function hanldeOut() {
    localStorage.clear();
    axios
      .get("http://localhost:3001/api/auth/logout", { withCredentials: true })
      .then((res) => {
        showToast(res.data.message, "success");
      })
      .catch(() => {
        showToast("Đăng xuất thất bại", "error");
      });
  }

  function SwitchPageClient() {
    navigate("/");
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Kho Sách</h2>
          <Switch
            defaultChecked
            checkedChildren={<FaUserShield style={{ height: 20 }} />}
            onChange={SwitchPageClient}
          />
          <div className="logout">
            <IoIosLogOut />
            <button>
              <Link
                style={{ color: "white" }}
                to={"/login"}
                onClick={hanldeOut}
              >
                Đăng xuất
              </Link>
            </button>
          </div>
        </div>

        <nav className="admin-nav">
          <ul className="list-nav">
            <li
              onClick={() => handleClick(1)}
              className={isActive === 1 ? "active" : ""}
            >
              <Link to={"/admin"} onClick={toggleDropdown}>
                <FaBook className="admin-icon" />
                <span>Quản lý sách</span>
                {isDropdownOpen ? (
                  <IoMdArrowDropup
                    className="admin-icon"
                    style={{ marginLeft: "20px" }}
                  />
                ) : (
                  <IoMdArrowDropdown
                    className="admin-icon"
                    style={{ marginLeft: "20px" }}
                  />
                )}
              </Link>
            </li>
            {isDropdownOpen && (
              <>
                <li>
                  <Link
                    to={"/admin/genre"}
                    className={`son-nav ${isActiveSon === 2 ? "active" : ""}`}
                    onClick={() => handleClickSon(1, 2)}
                  >
                    <FaTags className="admin-icon" />
                    <span>Quản lý thể loại</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/chapter"}
                    className={`son-nav ${isActiveSon === 3 ? "active" : ""}`}
                    onClick={() => handleClickSon(1, 3)}
                  >
                    <GrChapterAdd className="admin-icon" />
                    <span>Quản lý chương</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/author"}
                    className={`son-nav ${isActiveSon === 4 ? "active" : ""}`}
                    onClick={() => handleClickSon(1, 4)}
                  >
                    <FaPen className="admin-icon" />
                    <span>Quản lý tác giả</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/rate"}
                    className={`son-nav ${isActiveSon === 5 ? "active" : ""}`}
                    onClick={() => handleClickSon(1, 5)}
                  >
                    <FaStar className="admin-icon" />
                    <span>Quản lý đánh giá</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/comment"}
                    className={`son-nav ${isActiveSon === 6 ? "active" : ""}`}
                    onClick={() => handleClickSon(1, 6)}
                  >
                    <IoChatbubbleSharp className="admin-icon" />
                    <span>Quản lý bình luận</span>
                  </Link>
                </li>
              </>
            )}

            <li
              onClick={() => handleClick(6)}
              className={isActive === 6 ? "active" : ""}
            >
              <Link to={"/admin/users"}>
                <FaUsers className="admin-icon" />
                <span>Quản lý người dùng</span>
              </Link>
            </li>
            <li
              onClick={() => handleClick(7)}
              className={isActive === 7 ? "active" : ""}
            >
              <Link to={"/admin/chat"}>
                <FaMessage className="admin-icon" />
                <span>Chat</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminSidebar;
