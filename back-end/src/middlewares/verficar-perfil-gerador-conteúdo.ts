import { Perfil } from "../entidades/usuário";
export default function verificarPerfilGeradorConteúdo(
  request,
  response,
  next
) {
  if (request.perfil === Perfil.GERADOR_CONTEÚDO) return next();
  else return response.status(401).json({ erro: "Acesso não autorizado." });
}
