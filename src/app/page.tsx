"use client";
import ChatMessage from "@/components/chatMessage";
import { useEffect, useState } from "react";
import ChatForm from "@/components/chatForm";
import { socket } from "@/lib/socketClient";

export default function Home() {
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSendMessage = (message: string) => {
    const data = { room, sender: userName, message };
    socket.emit("message", data); // ارسال پیام به سرور
    setMessages([...messages, data]);
  };

  const handleJoinRoom = () => {
    if (userName && room) {
      socket.emit("join-room", { username: userName, room });
      setJoined(true);
    }
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevData) => [...prevData, data]);
    });

    socket.on("join-room", (msg) => {
      setMessages((prevData) => [
        ...prevData,
        { sender: "System", message: msg },
      ]);
    });

    socket.on("user-joined", (msg) => {
      setMessages((prevData) => [
        ...prevData,
        { sender: "System", message: msg },
      ]);
    });

    return () => {
      socket.off("message");
      socket.off("join-room");
      socket.off("user-joined");
    };
  }, []);

  return (
    <div className="w-[500px] min-w-[500px] flex justify-center m-auto">
      {joined ? (
        <div className="flex w-full gap-2 flex-col">
          <div className="bg-gray-400 w-full p-2 shadow rounded-md">
            <h2 className="text-2xl font-bold">Room: {room}</h2>
          </div>
          <div className="flex flex-col overflow-y-auto items-start gap-2 w-full bg-sky-300 p-2 rounded-md h-[832px] max-h-[830px]">
            {messages.map((item, index) => (
              <ChatMessage
                key={index}
                message={item.message}
                isOwnMassege={item.sender === userName}
                sender={item.sender}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="p-2 flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold">Join a room</h2>
          <input
            type="text"
            className="bg-blue-300 p-2 rounded-md"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            className="bg-blue-300 p-2 rounded-md"
            placeholder="Room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            onClick={handleJoinRoom}
            className="p-3 bg-blue-500 text-white rounded-md"
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
}
