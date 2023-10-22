import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();

// const socketUrl = import.meta.env.VITE_APP_API_URL_PRODUC;


export const SocketProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const { socket, online, conectarSocket, desconectarSocket } = useSocket("https://chat-server-socket-io.onrender.com");
  // console.log(socketUrl);



  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [ auth.logged, conectarSocket ]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [ auth.logged, desconectarSocket ]);

  //listen to changes in logged-in users
  useEffect(() => {
    socket?.on("usuarios-activos", (users) => {
      // console.log(users);
      dispatch({
        type: types.usuariosCargados,
        payload: users
      });
    });

  }, [ socket, dispatch ]);

  useEffect(() => {
    socket?.on("mensaje-personal", (message) => {
      // console.log(message); 
      dispatch({
        type: types.nuevoMensaje,
        payload: message
      });
      //mover scroll al final
      scrollToBottomAnimated("mensajes");
    });
  }, [ socket, dispatch ]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};