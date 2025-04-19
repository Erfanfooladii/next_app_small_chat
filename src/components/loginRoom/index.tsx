import Image from "next/image";
import logoImg from "../../../public/logo.png";
type LoginProps = {
  userName: string;
  setUserName: (value: string) => void;
  room: string;
  handleJoinRoom: () => void;
  setRoom: (value: string) => void;
};
const LoginRoom = ({
  userName,
  setUserName,
  room,
  handleJoinRoom,
  setRoom,
}: LoginProps) => {
  return (
    <form
      onSubmit={handleJoinRoom}
      className="p-2 flex flex-col gap-4 items-center"
    >
      <div className="w-24 h-24">
        <Image src={logoImg} className="w-full h-full" alt="logo image" />
      </div>
      <h2 className="text-2xl font-bold">Join a room</h2>
      <input
        type="text"
        className="bg-blue-300 focus:outline-none border-b-2 border-orange-400 focus:border-b-2 focus:border-sky-100 p-2 rounded-md"
        placeholder="UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        className="bg-blue-300 focus:outline-none border-b-2 border-orange-400 focus:border-b-2 focus:border-sky-100 p-2 rounded-md"
        placeholder="Room name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button
        type="submit"
        className="p-3 shadow hover:bg-blue-700 cursor-pointer bg-blue-500 text-white rounded-md"
      >
        Join
      </button>
    </form>
  );
};
export default LoginRoom;
