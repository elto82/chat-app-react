import { createContext, useCallback, useContext, useState } from "react";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const { dispatch } = useContext(ChatContext);
  const [ auth, setAuth ] = useState(initialState);

  const login = async (email, password) => {
    const resp = await fetchSinToken('login', { email, password }, 'POST');
    // console.log(rest);
    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      const { user } = resp;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      // console.log("Autenticado");
    }
    return resp.ok;
  };

  const register = async (name, email, password) => {
    // console.log(name, email, password);
    const resp = await fetchSinToken('login/new', { name, email, password }, 'POST');
    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      const { user } = resp;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      // console.log("Autenticado");
      return true;
    }
    return resp.msg;
  };


  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    // si el token no existe
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }

    const resp = await fetchConToken('login/renew');

    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      const { user } = resp;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      // console.log("Autenticado");
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');

    dispatch({ type: types.cerrarSesion, });

    setAuth({
      checking: false,
      logged: false,
    });
    // console.log("Desautenticado");
    return true;
  };

  return (
    <AuthContext.Provider value={{
      auth,
      login,
      register,
      logout,
      verificaToken,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
