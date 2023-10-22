import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

export const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);
  const [ message, setMessage ] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message.length === 0) return;
    // console.log(message);
    //emitir evento de sockets para enviar el mensaje
    // {
    //   from: //uid del usuario que envia el mensaje
    //   for: //uid del usuario que recibe el mensaje
    //   message: //mensaje que se envia      
    // }
    socket.emit("mensaje-personal", {
      from: auth.uid,
      for: chatState.chatActivo,
      message,
    });

    //hacer el dispatch del mensaje...

    setMessage("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="type_msg row">
          <div className="input_msg_write col-sm-9">
            <input
              type="text"
              className="write_msg"
              placeholder="Mensaje..."
              value={message}
              onChange={onChange}
            />
          </div>
          <div className="col-sm-3 text-center">
            <button className="msg_send_btn mt-3" type="submit">
              enviar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
