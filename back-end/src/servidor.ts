import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import RotasUsuário from "./rotas/rotas-usuário";
import RotasGeradorConteúdo from "./rotas/rotas-gerador-conteúdo";
import RotasMembroCanal from "./rotas/rotas-membro-canal";
const app = express();
const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use("/usuarios", RotasUsuário);
app.use("/geradores_conteudo", RotasGeradorConteúdo);
app.use("/membros_canal", RotasMembroCanal);
app.listen(PORT || 3333);

const conexão = createConnection();
export default conexão;
