import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGeradorConteúdo from "../middlewares/verficar-perfil-gerador-conteúdo";
import ServiçosGeradorConteúdo from "../serviços/serviços-gerador-conteúdo";
import verificarErroConteúdoToken from "src/middlewares/verificar-erro-conteúdo-token";
const RotasGeradorConteúdo = Router();
export default RotasGeradorConteúdo;
RotasGeradorConteúdo.post(
  "/",
  ServiçosGeradorConteúdo.cadastrarGeradorConteúdo
);
RotasGeradorConteúdo.get(
  "/:cpf",
  verificarToken,
  verificarPerfilGeradorConteúdo,
  ServiçosGeradorConteúdo.buscarGeradorConteúdo
);
RotasGeradorConteúdo.patch(
  "/",
  verificarToken,
  verificarPerfilGeradorConteúdo,
  ServiçosGeradorConteúdo.atualizarGeradorConteúdo
);
RotasGeradorConteúdo.post(
  "/canais-youtube",
  verificarToken,
  verificarPerfilGeradorConteúdo,
  ServiçosGeradorConteúdo.cadastrarCanalYoutube
);
RotasGeradorConteúdo.patch(
  "/canais-youtube",
  verificarToken,
  verificarPerfilGeradorConteúdo,
  ServiçosGeradorConteúdo.alterarCanalYoutube
);
RotasGeradorConteúdo.delete(
  "/canais-youtube/:id",
  verificarToken,
  verificarPerfilGeradorConteúdo,
  ServiçosGeradorConteúdo.removerCanalYoutube
);
RotasGeradorConteúdo.get(
  "/canais-youtube/gerador-conteudo/:cpf",
  verificarToken,
  verificarPerfilGeradorConteúdo,
  verificarErroConteúdoToken,
  ServiçosGeradorConteúdo.buscarCanaisYoutubeGeradorConteúdo
);
RotasGeradorConteúdo.get(
  "/compromissos/:id_canal_youtube",
  verificarToken,
  verificarPerfilGeradorConteúdo,
  ServiçosGeradorConteúdo.buscarCompromissosCanalYoutube
);
