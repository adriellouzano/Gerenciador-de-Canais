import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMembroCanal from "../../contextos/contexto-membro-canal";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarCheckbox,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";
export default function ConsultarCanalYoutube() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const {
    canalYoutubeConsultado,
    canalYoutubeCompromisso,
    setGeradorConteúdoCanalYoutube,
  } = useContext(ContextoMembroCanal);
  const dados = {
    nome_gerador_conteúdo:
      canalYoutubeConsultado?.gerador_conteúdo?.usuário?.nome ||
      canalYoutubeCompromisso?.gerador_conteúdo?.usuário?.nome,
    nome: canalYoutubeConsultado?.nome || canalYoutubeCompromisso?.nome,
    público_principal:
      canalYoutubeConsultado?.público_principal ||
      canalYoutubeCompromisso?.público_principal,
    número_incritos:
      canalYoutubeConsultado?.número_incritos ||
      canalYoutubeCompromisso?.número_incritos,
    data_criação:
      canalYoutubeConsultado?.data_criação ||
      canalYoutubeCompromisso?.data_criação,
    monetizado:
      canalYoutubeConsultado?.monetizado || canalYoutubeCompromisso?.monetizado,
  };
  const navegar = useNavigate();

  function consultarGeradorConteúdoCanalYoutube() {
    if (canalYoutubeConsultado)
      setGeradorConteúdoCanalYoutube(canalYoutubeConsultado.gerador_conteúdo);
    else
      setGeradorConteúdoCanalYoutube(canalYoutubeCompromisso.gerador_conteúdo);
    navegar("../consultar-gerador-conteúdo-canal-youtube");
  }
  function retornar() {
    if (canalYoutubeConsultado) navegar("../pesquisar-canais-youtube");
    else if (canalYoutubeCompromisso) navegar("../cadastrar-compromisso");
  }
  return (
    <div className={estilizarFlex()}>
      <Card
        title="Consultar Canal Youtube"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Gerador Conteúdo*:
          </label>
          <InputText
            name="nome_gerador_conteúdo"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_gerador_conteúdo}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Nome*:
          </label>
          <InputText
            name="nome"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Público Principal*:
          </label>
          <InputText
            name="público_principal"
            className={estilizarInputText(null, 200, usuárioLogado.cor_tema)}
            value={dados.público_principal}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data Criação*:
          </label>
          <InputText
            name="data_criação"
            type="date"
            value={dados.data_criação}
            className={estilizarInputText(null, usuárioLogado.cor_tema)}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Canal Monetizado*:
          </label>
          <Checkbox
            name="monetizado"
            checked={dados.monetizado}
            className={estilizarCheckbox(null)}
            autoResize
            disabled
          />
        </div>
        <Divider className={estilizarDivider()} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornar}
          />
          <Button
            className={estilizarBotão()}
            label="Gerador Conteúdo"
            onClick={consultarGeradorConteúdoCanalYoutube}
          />
        </div>
      </Card>
    </div>
  );
}
