import { useState } from "react";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");
  const handeleSumite = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (
    <form
      onSubmit={handeleSumite}
      className="w-full bg-white p-1 flex justify-center items-center gap-2"
    >
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Enter yout message"
        value={message}
        className="p-2 rounded-b-md w-full shadow bg-gray-200"
        type="text"
      />
      <button className="bg-blue-500 text-white rounded-md p-2">send</button>
    </form>
  );
};

export default ChatForm;
