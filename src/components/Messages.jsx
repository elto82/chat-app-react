import { useContext } from "react";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);


  return (
    <>

      <div className="mesgs">


        <div className="msg_history" id="mensajes">
          {
            chatState.mensajes.map(msg =>
            (
              (msg.for === auth.uid)
                ? <IncomingMessage key={msg._id} msg={msg} />
                : (<OutgoingMessage key={msg._id} msg={msg} />)
            ))
          }
        </div>

        <SendMessage />

      </div>

    </>
  );
};
