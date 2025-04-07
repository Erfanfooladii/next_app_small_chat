"use client";
import ChatMessage from "@/components/chatMessage";
import ChatForm from "@/components/chatForm";
import { useChatRoom } from "@/utils/useChatRoom";
import LoginRoom from "@/components/loginRoom";
const ChatRoom = () => {
  const {
    messages,
    room,
    joined,
    userName,
    setRoom,
    setUserName,
    handleJoinRoom,
    handleSendMessage,
  } = useChatRoom();

  return (
    <div className="w-[500px] h-screen items-center flex justify-center m-auto">
      {joined ? (
        <div className="flex w-full gap-2 flex-col">
          <div className="bg-sky-500 w-full p-2 shadow rounded-md">
            <h2 className="text-2xl text-white font-bold">Room: {room}</h2>
          </div>
          <div className="flex flex-col overflow-y-auto items-start gap-2 w-full bg-sky-100 p-2 rounded-md h-[832px] max-h-[830px]">
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
        <LoginRoom
          setRoom={setRoom}
          setUserName={setUserName}
          handleJoinRoom={handleJoinRoom}
          room={room}
          userName={userName}
        />
      )}
    </div>
  );
};
export default ChatRoom;
