import { useChatForm } from "@/utils/useChatForm";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const { handeleSumite, setMessage, message } = useChatForm({ onSendMessage });
  return (
    <form
      onSubmit={handeleSumite}
      className="w-full rounded-xl shadow bg-gray-200 p-1 flex justify-center items-center gap-2"
    >
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Enter yout message"
        value={message}
        className="p-2  w-full bg-gray-200"
        type="text"
      />
      <button className="bg-blue-500 cursor-pointer hover:bg-sky-400 focus:outline-none text-white rounded-md p-2">
        send
      </button>
    </form>
  );
};

export default ChatForm;
