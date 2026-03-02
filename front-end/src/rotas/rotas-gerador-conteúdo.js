import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";
export default function RotasGeradorConteúdo() {
  const { usuárioLogado } = useContext(UsuárioContext);
  if (usuárioLogado.perfil === "gerador_conteúdo") return <Outlet />;
  else return <Navigate to="/" />;
}
