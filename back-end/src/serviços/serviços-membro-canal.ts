import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import MembroCanal from "../entidades/membro-canal";
import ServiçosUsuário from "./serviços-usuário";
import CanalYoutube from "../entidades/canal-youtube";
import Compromisso from "../entidades/compromisso";

export default class ServiçosMembroCanal {
  constructor() {}
  static async cadastrarMembroCanal(request, response) {
    try {
      const {
        usuário_info,
        tipo_participação,
        data_entrada,
        data_nascimento,
        telefone,
      } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const membro_canal = MembroCanal.create({
          usuário,
          tipo_participação,
          data_entrada,
          data_nascimento,
          telefone,
        });
        await transactionManager.save(membro_canal);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }
  static async atualizarMembroCanal(request, response) {
    try {
      const {
        cpf,
        tipo_participação,
        data_entrada,
        data_nascimento,
        telefone,
      } = request.body;
      const cpf_encriptado = md5(cpf);
      await MembroCanal.update(
        { usuário: { cpf: cpf_encriptado } },
        { tipo_participação, data_entrada, data_nascimento, telefone }
      );
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : atualizarMembroCanal" });
    }
  }
  static async buscarMembroCanal(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const membro_canal = await MembroCanal.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      if (!membro_canal)
        return response
          .status(404)
          .json({ erro: "Membro canal não encontrado." });
      return response.json({
        nome: membro_canal.usuário.nome,
        email: membro_canal.usuário.email,
        tipo_participação: membro_canal.tipo_participação,
        data_entrada: membro_canal.data_entrada,
        data_nascimento: membro_canal.data_nascimento,
        telefone: membro_canal.telefone,
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarMembroCanal" });
    }
  }
  static async cadastrarCompromisso(request, response) {
    try {
      const { id_canal_youtube, membro_exclusivo, descrição, cpf } =
        request.body;
      const cpf_encriptado = md5(cpf);
      const membro_canal = await MembroCanal.findOne({
        where: { usuário: cpf_encriptado },
      });
      const canal_youtube = await CanalYoutube.findOne(id_canal_youtube);
      const compromissos = await Compromisso.find({
        where: { membro_canal, canal_youtube },
      });
      if (compromissos.length > 0)
        return response
          .status(404)
          .json({ erro: "O membro já cadastrou um compromisso para o canal." });
      await Compromisso.create({
        membro_exclusivo,
        descrição,
        membro_canal,
        canal_youtube,
      }).save();
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : cadastrarCompromisso" });
    }
  }
  static async removerCompromisso(request, response) {
    try {
      const id = request.params.id;
      await Compromisso.delete(id);
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : removerCompromisso" });
    }
  }
  static async buscarCompromissosMembroCanal(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const compromissos = await Compromisso.find({
        where: { membro_canal: { usuário: cpf_encriptado } },
        relations: [
          "membro_canal",
          "membro_canal.usuário",
          "canal_youtube",
          "canal_youtube.gerador_conteúdo",
          "canal_youtube.gerador_conteúdo.usuário",
        ],
      });
      return response.json(compromissos);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscar compromissos membro" });
    }
  }
  static async buscarCanaisYoutube(request, response) {
    try {
      const canais_youtube = await CanalYoutube.find({
        relations: ["gerador_conteúdo", "gerador_conteúdo.usuário"],
      });
      return response.json(canais_youtube);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarcanaisyoutube" });
    }
  }
}
