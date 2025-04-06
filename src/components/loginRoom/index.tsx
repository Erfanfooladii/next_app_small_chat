const LoginRoom = ({
  userName,
  setUserName,
  room,
  handleJoinRoom,
  setRoom,
}) => {
  return (
    <div className="p-2 flex flex-col gap-4 items-center">
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
        onClick={handleJoinRoom}
        className="p-3 bg-blue-500 text-white rounded-md"
      >
        Join
      </button>
    </div>
  );
};
