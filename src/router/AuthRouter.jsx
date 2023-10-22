import { Routes, Route, Outlet } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import "../css/login-register.css";

export const AuthRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route index element={<LoginPage />} />
            <Route
              path="*"
              element={
                // Redirige a LoginPage y mantiene la URL original en la barra de direcciones
                <LoginPage />
              }
            // Otra opción es usar una función para redirigir a LoginPage y eliminar la URL original de la barra de direcciones
            // element={() => {
            //   navigate("/auth/login");
            //   return null;
            // }}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
