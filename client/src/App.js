import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3005");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="w-full h-full absolute flex justify-center buttom-[30%]  bg-slate-300   items-center">
      {!showChat ? (
        <div className=" flex flex-col justify-center relative h-full  ">
          <h3 className="text-center mb-3 uppercase">Entre no chat</h3>
          <input
          className="input  input-info"
            type="text"
            placeholder="name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
          className="input my-3  input-info"
            type="text"
            placeholder="Qual porta?"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button className="   btn-success btn" onClick={joinRoom}>Entre no chat </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;