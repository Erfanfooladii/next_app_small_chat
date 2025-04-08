import { useState } from "react";

export const useChatForm = ({
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
  return {
    handeleSumite,
    setMessage,
    message,
  };
};
