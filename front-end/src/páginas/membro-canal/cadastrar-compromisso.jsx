import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMembroCanal from "../../contextos/contexto-membro-canal";
import {
  serviçoCadastrarCompromisso,
  serviçoRemoverCompromisso,
} from "../../serviços/serviços-membro-canal";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoRemover,
  estilizarCard,
  estilizarCheckbox,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarInputTextarea,
  estilizarLabel,
} from "../../utilitários/estilos";
export default function CadastrarCompromisso() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const {
    compromissoConsultado,
    canalYoutubeSelecionado,
    setCanalYoutubeCompromisso,
    setCanalYoutubeConsultado,
  } = useContext(ContextoMembroCanal);
  const [dados, setDados] = useState({
    id_canal_youtube: canalYoutubeSelecionado?.id || "",
    membro_exclusivo: compromissoConsultado?.membro_exclusivo || "",
    descrição: compromissoConsultado?.descrição || "",
  });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function consultarCanalYoutubeCompromisso() {
    setCanalYoutubeConsultado(null);
    setCanalYoutubeCompromisso(compromissoConsultado?.canal_youtube);
    navegar("../consultar-canal-youtube");
  }
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  }
  function validarCampos() {
    const { justificativa } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      justificativa,
    });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }
  function canalYoutubeLabel() {
    if (compromissoConsultado?.nome_canal_youtube || canalYoutubeSelecionado)
      return "Canal Selecionada*:";
    else return "Selecione uma Canal*:";
  }
  function pesquisarCanalYoutube() {
    navegar("../pesquisar-canais-youtube");
  }
  function retornarAdministrarCompromissos() {
    navegar("../administrar-compromissos");
  }
  async function cadastrarCompromisso() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarCompromisso({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(
          referênciaToast,
          "Compromisso cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  async function removerCompromisso() {
    try {
      await serviçoRemoverCompromisso(compromissoConsultado.id);
      mostrarToast(
        referênciaToast,
        "Compromisso removido com sucesso!",
        "sucesso"
      );
    } catch (error) {
      mostrarToast(referênciaToast, error.response.data.erro, "erro");
    }
  }
  function BotõesAções() {
    if (compromissoConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarCompromissos}
          />
          <Button
            className={estilizarBotãoRemover()}
            label="Remover"
            onClick={removerCompromisso}
          />
          <Button
            className={estilizarBotão()}
            label="Canal Youtube"
            onClick={consultarCanalYoutubeCompromisso}
          />
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarCompromissos}
          />
          <Button
            className={estilizarBotão()}
            label="Cadastrar"
            onClick={cadastrarCompromisso}
          />
        </div>
      );
    }
  }
  function títuloFormulário() {
    if (compromissoConsultado) return "Remover Compromisso";
    else return "Cadastrar Compromisso";
  }
  function CanalYoutubeInputText() {
    if (canalYoutubeSelecionado?.nome) {
      return (
        <InputText
          name="nome_canal_youtube"
          className={estilizarInputText(
            erros.nome_canal_youtube,
            400,
            usuárioLogado.cor_tema
          )}
          value={canalYoutubeSelecionado?.nome}
          disabled
        />
      );
    } else if (compromissoConsultado?.canal_youtube?.nome) {
      return (
        <InputText
          name="nome_canal_youtube"
          className={estilizarInputText(
            erros.nome_canal_youtube,
            400,
            usuárioLogado.cor_tema
          )}
          value={compromissoConsultado?.canal_youtube?.nome}
          disabled
        />
      );
    } else return null;
  }
  function BotãoSelecionar() {
    if (!canalYoutubeSelecionado && !compromissoConsultado) {
      return (
        <Button
          className={estilizarBotão()}
          label="Selecionar"
          onClick={pesquisarCanalYoutube}
        />
      );
    } else if (canalYoutubeSelecionado) {
      return (
        <Button
          className={estilizarBotão()}
          label="Substituir"
          onClick={pesquisarCanalYoutube}
        />
      );
    } else return null;
  }
  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={retornarAdministrarCompromissos}
        position="bottom-center"
      />
      <Card
        title={títuloFormulário()}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            {canalYoutubeLabel()}
          </label>
          <BotãoSelecionar />
          <CanalYoutubeInputText />
          <MostrarMensagemErro mensagem={erros.id} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Membro Exclusivo*:
          </label>
          <Checkbox
            name="membro_exclusivo"
            checked={dados.membro_exclusivo}
            className={estilizarCheckbox()}
            onChange={alterarEstado}
            autoResize
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Descrição*:
          </label>
          <InputTextarea
            name="descrição"
            value={dados.descrição}
            className={estilizarInputTextarea(
              erros.descrição,
              usuárioLogado.cor_tema
            )}
            onChange={alterarEstado}
            autoResize
            cols={40}
          />
          <MostrarMensagemErro mensagem={erros.descrição} />
        </div>
        <Divider className={estilizarDivider()} />
        <BotõesAções />
      </Card>
    </div>
  );
}
