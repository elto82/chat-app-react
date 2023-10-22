import { useContext } from "react";
import { SidebarChatItem } from "./SidebarChatItem";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Sidebar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className="inbox_chat">
        {
          chatState.users?.filter(
            (user) => user.uid !== auth.uid)
            .map((user) => (
              <SidebarChatItem key={user.uid}
                user={user}
              />
            ))
        }

        <div className="extra_space"></div>
      </div>
    </>
  );
};
