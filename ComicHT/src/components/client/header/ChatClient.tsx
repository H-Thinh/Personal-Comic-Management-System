import { FaPaperclip } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { socket } from "../../../socket";
import { useEffect, useState } from "react";

interface ChatCProps {
  user: { id: number; name: string; role: string } | null;
  input: { message: string };
  setShowMessage: (show: boolean) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ChatClient({ user, input, setShowMessage, handleInput }: ChatCProps) {
  const [connnectSocket, setConnectSocket] = useState(false);

  const [messages, setMessages] = useState<
    {
      role: "Client" | "Admin";
      message: string;
    }[]
  >([]);

  useEffect(() => {
    socket.on("receive_message", ({ role, message }) => {
      setMessages((prevMessages) => [...prevMessages, { role, message }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  function handleChatRealTime() {
    setConnectSocket(true);
    socket.connect();
    socket.emit("create_room", user?.name ? user.name : "guest");
    socket.emit("join_room", user?.name);

    handleSendMessage("Bắt đầu cuộc trò chuyện");

    return () => {
      socket.off("create_room");
      socket.off("join_room");
    };
  }

  function handleSendMessage(message: string) {
    socket.emit("send_message", {
      roomId: user?.name ? user.name : "guest",
      role: user?.role,
      message,
    });

    return () => {
      socket.off("send_message");
    };
  }

  return (
    <div
      className="fixed bottom-10 right-24 bg-white w-80 h-96 rounded-lg truncate"
      style={{ boxShadow: "1px 1px 6px 2px #ccc" }}
    >
      <div className="bg-red-500 w-full p-2 flex text-white items-center justify-between">
        <p>Chat Box</p>
        <IoMdClose
          className="cursor-pointer"
          size={25}
          onClick={() => setShowMessage(false)}
        />
      </div>

      {connnectSocket ? (
        <div className="flex flex-col overflow-y-auto" style={{ height: 302 }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.role === "Admin" ? "self-start" : "self-end"
              } bg-red-500 h-auto m-2 p-2 rounded-lg max-w-[70%] text-white text-wrap`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ height: 302 }}
        >
          <button
            className="bg-gray-300 p-1 rounded-lg"
            onClick={() => handleChatRealTime()}
          >
            Bắt đầu
          </button>
        </div>
      )}

      <div className="flex items-center pr-1 pl-1">
        <FaPaperclip />
        <input
          type="text"
          className="bg-white outline-none "
          placeholder="Nhập nội dung"
          name="message"
          onChange={handleInput}
        />
        <button
          className="bg-red-500 p-1 text-white rounded-lg opacity-25 hover:opacity-90 transition-all duration-300"
          onClick={() => handleSendMessage(input.message)}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

export default ChatClient;
