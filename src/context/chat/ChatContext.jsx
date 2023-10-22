import { createContext, useReducer } from "react";
import { ChatReducer } from "./ChatReducer";

export const ChatContext = createContext();

const initialState = {
  uid: "",
  chatActivo: null,//uid of the user I want to send messages to
  usuarios: [],// all users db
  mensajes: [],// chat seleted
};

export const ChatProvider = ({ children }) => {
  const [ chatState, dispatch ] = useReducer(ChatReducer, initialState);
  return (
    <ChatContext.Provider value={{
      chatState,
      dispatch,
    }}>

      {children}
    </ChatContext.Provider>
  );

};
