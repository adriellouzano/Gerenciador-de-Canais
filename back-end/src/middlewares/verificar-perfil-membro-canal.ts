import { Perfil } from "../entidades/usuário";
export default function verificarPerfilMembroCanal(request, response, next) {
  if (request.perfil === Perfil.MERMBRO_CANAL) return next();
  else return response.status(401).json({ erro: "Acesso não autorizado." });
}
