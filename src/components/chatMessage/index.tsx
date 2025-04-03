interface ChatMessageProps {
  message: string;
  sender: string;
  isOwnMassege: boolean;
}

const ChatMessage = ({ message, sender, isOwnMassege }: ChatMessageProps) => {
  const isSystemMessage = sender === "System";
  return (
    <div
      className={`flex w-full  ${
        isSystemMessage
          ? "justify-center"
          : isOwnMassege
          ? "justify-end"
          : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isSystemMessage
            ? "bg-gray-600 text-white text-center text-sm"
            : isOwnMassege
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-800 text-white rounded-bl-none"
        }`}
      >
        {!isSystemMessage && <p className="text-sm font-bold">{sender}</p>}
        <p>{message}</p>
      </div>
    </div>
  );
};
export default ChatMessage;
