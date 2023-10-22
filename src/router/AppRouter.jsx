import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [ verificaToken ]);

  if (auth.checking) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/*"
          element={auth.logged ? <ChatPage /> : <AuthRouter />}
        />
        <Route
          path="/"
          element={auth.logged ? <ChatPage /> : <AuthRouter />} />
        <Route path="*" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};
