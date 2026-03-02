import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";
export default function RotasMembroCanal() {
  const { usuárioLogado } = useContext(UsuárioContext);
  if (usuárioLogado.perfil === "membro_canal") return <Outlet />;
  else return <Navigate to="/" />;
}
