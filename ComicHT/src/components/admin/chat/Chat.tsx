import { Modal } from "antd";

import { useEffect, useState } from "react";

import { FaPaperclip } from "react-icons/fa";

import { socket } from "../../../socket";

import { RootState } from "../../../redux/authStore";

import { useSelector } from "react-redux";

function Chat() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [showModel, setShowModel] = useState<boolean>(false);

  const [listRoom, setListRoom] = useState<number[]>([]);

  const [messages, setMessages] = useState<
    {
      role: "Client" | "Admin";
      message: string;
    }[]
  >([]);

  const [inputMessage, setInputMessage] = useState<string>("");

  function handleGetListRoomsChat() {
    socket.emit("get_rooms");
    socket.on("room_list", (list) => {
      setListRoom(list);
      console.log("Danh sách phòng:", list);
    });

    return () => {
      socket.off("get_rooms");
      socket.off("room_list");
    };
  }

  function handleJoinRoom(roomId: number) {
    localStorage.setItem("roomId", roomId.toString());
    socket.emit("join_room", roomId);
    socket.on("joined_room", (message) => {
      setMessages(message);
    });
    socket.on("room_full", () => {
      alert("Phòng đã đủ 2 người, không thể tham gia!");
    });

    return () => {
      socket.off("join_room");
      socket.off("room_full");
    };
  }

  useEffect(() => {
    socket.connect();
    handleGetListRoomsChat();

    socket.on("receive_message", ({ roomId, role, message }) => {
      setMessages((prevMessages) => [...prevMessages, { role, message }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  function handleSendMessage() {
    socket.emit("send_message", {
      roomId: localStorage.getItem("roomId"),
      role: user?.role,
      message: inputMessage,
    });

    return () => {
      socket.off("send_message");
    };
  }

  return (
    <>
      <section className="category-management">
        <h2 className="section-title">Người dùng đã đang kết nối</h2>

        <button
          className="bg-gray-300 rounded-lg p-1"
          onClick={handleGetListRoomsChat}
        >
          Refresh Rooms
        </button>

        <div className="connected-users grid gap-4 grid-cols-6">
          {listRoom.map((roomId) => {
            return (
              <div
                key={roomId}
                className="bg-red-500 p-2 rounded-lg text-white text-center cursor-pointer"
                onClick={() => {
                  setShowModel(true);
                  handleJoinRoom(roomId);
                }}
              >
                <span>{`User ${roomId}`}</span>
              </div>
            );
          })}
        </div>

        <Modal
          open={showModel}
          onCancel={() => {
            setShowModel(false);
            socket.emit("leave_room", localStorage.getItem("roomId"));
            return () => {
              socket.off("leave_room");
            };
          }}
          destroyOnHidden={true}
          footer={null}
        >
          <div className="p-4 ">
            <h3 className="text-lg font-semibold mb-4">
              Chat với User {localStorage.getItem("roomId")}
            </h3>
            <div
              className="flex flex-col overflow-y-auto text-base"
              style={{ height: 302 }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.role === "Admin" ? "self-end" : "self-start"
                  } bg-red-500 h-auto m-2 p-2 rounded-lg max-w-[70%] text-white text-wrap`}
                >
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center pr-1 pl-1">
              <FaPaperclip />
              <input
                type="text"
                className="bg-white outline-none "
                placeholder="Nhập nội dung"
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                className="bg-red-500 p-1 text-white rounded-lg opacity-25 hover:opacity-90 transition-all duration-300"
                onClick={() => handleSendMessage()}
              >
                Gửi
              </button>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
}

export default Chat;
