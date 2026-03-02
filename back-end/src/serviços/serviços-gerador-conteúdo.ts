import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GeradorConteúdo from "../entidades/gerador-conteúdo";
import ServiçosUsuário from "./serviços-usuário";
import CanalYoutube from "../entidades/canal-youtube";
import Compromisso from "src/entidades/compromisso";
export default class ServiçosGeradorConteúdo {
  constructor() {}

  static async buscarCompromissosCanalYoutube(request, response) {
    try {
      const id_canal_youtube = request.params.id_canal_youtube;
      const compromissos = await Compromisso.find({
        where: { canal_youtube: { id: id_canal_youtube } },
        relations: ["membro_canal", "membro_canal.usuário", "canal_youtube"],
      });
      return response.json(compromissos);
    } catch (error) {
      return response.status(500).json({
        erro: "Erro BD: buscarCompromissosCanalYoutube",
      });
    }
  }
  static async cadastrarGeradorConteúdo(request, response) {
    try {
      const { usuário_info, especialidade, anos_experiência } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const gerador_conteúdo = GeradorConteúdo.create({
          usuário,
          especialidade,
          anos_experiência,
        });
        await transactionManager.save(gerador_conteúdo);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }
  static async buscarGeradorConteúdo(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const gerador_conteúdo = await GeradorConteúdo.findOne({
        where: { usuário: { cpf: cpf_encriptado } },
        relations: ["usuário"],
      });
      if (!gerador_conteúdo)
        return response
          .status(404)
          .json({ erro: "Gerador Conteúdo não encontrado." });
      return response.json({
        nome: gerador_conteúdo.usuário.nome,
        email: gerador_conteúdo.usuário.email,
        especialidade: gerador_conteúdo.especialidade,
        anos_experiência: gerador_conteúdo.anos_experiência,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarGeradorConteúdo" });
    }
  }
  static async atualizarGeradorConteúdo(request, response) {
    try {
      const { cpf, especialidade, anos_experiência } = request.body;
      const cpf_encriptado = md5(cpf);
      await GeradorConteúdo.update(
        { usuário: { cpf: cpf_encriptado } },
        { especialidade, anos_experiência }
      );
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : atualizarGeradorConteúdo" });
    }
  }
  static async cadastrarCanalYoutube(request, response) {
    try {
      const {
        nome,
        público_principal,
        número_inscritos,
        data_criação,
        monetizado,
        cpf,
      } = request.body;
      const cpf_encriptado = md5(cpf);
      const gerador_conteúdo = await GeradorConteúdo.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      await CanalYoutube.create({
        nome,
        público_principal,
        número_inscritos,
        data_criação,
        monetizado,
        gerador_conteúdo,
      }).save();
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : cadastrarCanalYoutube" });
    }
  }
  static async alterarCanalYoutube(request, response) {
    try {
      const {
        id,
        nome,
        público_principal,
        data_criação,
        número_inscritos,
        monetizado,
      } = request.body;
      await CanalYoutube.update(id, {
        nome,
        público_principal,
        data_criação,
        número_inscritos,
        monetizado,
      });
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : alterarCanalYoutube" });
    }
  }
  static async removerCanalYoutube(request, response) {
    try {
      const id_canal_youtube = request.params.id;
      const canal_youtube = await CanalYoutube.findOne(id_canal_youtube);
      await CanalYoutube.remove(canal_youtube);
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : removerCanalYoutube" });
    }
  }
  static async buscarCanaisYoutubeGeradorConteúdo(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const canais_youtube = await CanalYoutube.find({
        where: { gerador_conteúdo: { usuário: cpf_encriptado } },
        relations: ["gerador_conteúdo", "gerador_conteúdo.usuário"],
      });
      return response.json(canais_youtube);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarCanaisYoutubeGeradorConteúdo" });
    }
  }
}
