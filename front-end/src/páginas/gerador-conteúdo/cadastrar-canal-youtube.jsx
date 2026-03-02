import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGeradorConteúdo from "../../contextos/contexto-gerador-conteúdo";
import {
  serviçoAlterarCanalYoutube,
  serviçoCadastrarCanalYoutube,
  serviçoRemoverCanalYoutube,
} from "../../serviços/serviços-gerador-conteúdo";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRemover,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarCheckbox,
  estilizarDivCampo,
  estilizarDivider,
  estilizarDropdown,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputTextarea,
  estilizarLabel,
} from "../../utilitários/estilos";
export default function CadastrarCanalYoutube() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { canalYoutubeConsultado } = useContext(ContextoGeradorConteúdo);
  const [dados, setDados] = useState({
    nome: canalYoutubeConsultado?.nome || "",
    público_principal: canalYoutubeConsultado?.público_principal || "",
    número_inscritos: canalYoutubeConsultado?.número_inscritos || "",
    data_criação: canalYoutubeConsultado?.data_criação || "",
    monetizado: canalYoutubeConsultado?.monetizado || "",
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();
  const opçõesPúblicoPrincipal = [
    { label: "Infantil", value: "Infantil" },
    { label: "Adolecentes", value: "Adolecentes" },
    { label: "Adulto", value: "Adulto" },
    { label: "Famílias", value: "Famílias" },
  ];
  function mostrarCompromissos() {
    navegar("../pesquisar-compromissos");
  }
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  }
  function validarCampos() {
    const { nome, público_principal, número_inscritos, data_criação } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      nome,
      público_principal,
      número_inscritos,
      data_criação,
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }
  function retornarAdministrarCanaisYoutube() {
    navegar("../administrar-canais-youtube");
  }
  async function cadastrarCanalYoutube() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarCanalYoutube({
          ...dados,
          cpf: usuárioLogado.cpf,
        });
        mostrarToast(
          referênciaToast,
          "Canal Youtube cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
  }
  async function alterarCanalYoutube() {
    if (validarCampos()) {
      try {
        await serviçoAlterarCanalYoutube({
          ...dados,
          id: canalYoutubeConsultado.id,
        });
        mostrarToast(
          referênciaToast,
          "Canal Youtube alterado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
  }

  async function removerCanalYoutube() {
    try {
      await serviçoRemoverCanalYoutube(canalYoutubeConsultado.id);
      mostrarToast(
        referênciaToast,
        "Canal Youtube excluído com sucesso!",
        "sucesso"
      );
    } catch (error) {
      mostrarToast(referênciaToast, error.response.data.erro, "error");
    }
  }
  function BotõesAções() {
    if (canalYoutubeConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarCanaisYoutube}
          />
          <Button
            className={estilizarBotãoRemover()}
            label="Remover"
            onClick={removerCanalYoutube}
          />
          <Button
            className={estilizarBotão()}
            label="Alterar"
            onClick={alterarCanalYoutube}
          />
          <Button
            className={estilizarBotão()}
            label="Compromissos"
            onClick={mostrarCompromissos}
          />
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarCanaisYoutube}
          />
          <Button
            className={estilizarBotão()}
            label="Cadastrar"
            onClick={cadastrarCanalYoutube}
          />
        </div>
      );
    }
  }
  function títuloFormulário() {
    if (canalYoutubeConsultado) return "Alterar Canal";
    else return "Cadastrar Canal";
  }
  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={retornarAdministrarCanaisYoutube}
        position="bottom-center"
      />
      <Card
        title={títuloFormulário()}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Nome*:
          </label>
          <InputText
            name="nome"
            className={estilizarInputText(
              erros.nome,
              400,
              usuárioLogado.cor_tema
            )}
            value={dados.nome}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.nome} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Público Principal*:
          </label>
          <Dropdown
            name="público_principal"
            className={estilizarDropdown(
              erros.público_principal,
              usuárioLogado.cor_tema
            )}
            value={dados.público_principal}
            options={opçõesPúblicoPrincipal}
            onChange={alterarEstado}
            placeholder="-- Selecione --"
          />
          <MostrarMensagemErro mensagem={erros.público_principal} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Número Inscritos*:
          </label>
          <InputTextarea
            name="número_inscritos"
            value={dados.número_inscritos}
            className={estilizarInputTextarea(
              erros.número_inscritos,
              usuárioLogado.cor_tema
            )}
            onChange={alterarEstado}
            autoResize
            cols={40}
          />
          <MostrarMensagemErro mensagem={erros.número_inscritos} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data de Criação*:
          </label>
          <InputText
            name="data_criação"
            type="date"
            value={dados.data_criação}
            className={estilizarInputText(
              erros.data_criação,
              usuárioLogado.cor_tema
            )}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.data_criação} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Canal Monetizado*:
          </label>
          <Checkbox
            name="monetizado"
            checked={dados.monetizado}
            className={estilizarCheckbox()}
            onChange={alterarEstado}
            autoResize
          />
        </div>
        <Divider className={estilizarDivider()} />
        <BotõesAções />
      </Card>
    </div>
  );
}
