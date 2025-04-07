import { useState, useEffect } from "react";
import { socket } from "@/lib/socketClient";

export type Message = {
  sender: string;
  message: string;
};

export const useChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSendMessage = (message: string) => {
    const data = { room, sender: userName, message };
    socket.emit("message", data);
    setMessages((prev) => [...prev, data]);
  };

  const handleJoinRoom = () => {
    if (userName && room) {
      socket.emit("join-room", { username: userName, room });
      setJoined(true);
    }
  };

  useEffect(() => {
    const handleNewMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleSystemMessage = (msg: string) => {
      setMessages((prev) => [...prev, { sender: "System", message: msg }]);
    };

    socket.on("message", handleNewMessage);
    socket.on("join-room", handleSystemMessage);
    socket.on("user-joined", handleSystemMessage);

    return () => {
      socket.off("message", handleNewMessage);
      socket.off("join-room", handleSystemMessage);
      socket.off("user-joined", handleSystemMessage);
    };
  }, []);

  return {
    messages,
    room,
    joined,
    userName,
    setRoom,
    setUserName,
    handleJoinRoom,
    handleSendMessage,
  };
};
