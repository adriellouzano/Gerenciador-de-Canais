import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilMembroCanal from "../middlewares/verificar-perfil-membro-canal";
import ServiçosMembroCanal from "../serviços/serviços-membro-canal";
import verificarErroConteúdoToken from "src/middlewares/verificar-erro-conteúdo-token";
const RotasMembroCanal = Router();
export default RotasMembroCanal;
RotasMembroCanal.post("/", ServiçosMembroCanal.cadastrarMembroCanal);
RotasMembroCanal.patch(
  "/",
  verificarToken,
  verificarPerfilMembroCanal,
  ServiçosMembroCanal.atualizarMembroCanal
);
RotasMembroCanal.get(
  "/:cpf",
  verificarToken,
  verificarPerfilMembroCanal,
  ServiçosMembroCanal.buscarMembroCanal
);
RotasMembroCanal.post(
  "/compromissos/",
  verificarToken,
  verificarPerfilMembroCanal,
  ServiçosMembroCanal.cadastrarCompromisso
);
RotasMembroCanal.delete(
  "/compromissos/:id",
  verificarToken,
  verificarPerfilMembroCanal,
  ServiçosMembroCanal.removerCompromisso
);
RotasMembroCanal.get(
  "/compromissos/membro-canal/:cpf",
  verificarToken,
  verificarPerfilMembroCanal,
  verificarErroConteúdoToken,
  ServiçosMembroCanal.buscarCompromissosMembroCanal
);
RotasMembroCanal.get(
  "/compromissos/canais-youtube/",
  verificarToken,
  verificarPerfilMembroCanal,
  ServiçosMembroCanal.buscarCanaisYoutube
);
