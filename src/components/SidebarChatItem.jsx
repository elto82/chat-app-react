import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

export const SidebarChatItem = ({ user }) => {
  const { dispatch, chatState } = useContext(ChatContext);
  const { chatActivo } = chatState;
  const { name, online, uid } = user;

  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: uid
    });
    //cargar mensajes del chat
    const resp = await fetchConToken(`mensajes/${uid}`);
    // console.log(resp.mensajes);
    dispatch({
      type: types.cargarMensajes,
      payload: resp.mensajes
    });
    //mover el scroll hacia abajo
    scrollToBottom("mensajes");
  };


  return (
    <>
      <div
        className={`chat_list ${(uid === chatActivo) && 'active_chat'}`}
        onClick={onClick}
      >
        {/* active_chat */}
        <div className="chat_people">
          <div className="chat_img">
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
          </div>
          <div className="chat_ib">
            <h5>{name}</h5>
            {
              (online)
                ? (<span className="text-success">Online</span>)
                : <span className="text-danger">Offline</span>
            }
          </div>
        </div>
      </div>
    </>
  );
};
