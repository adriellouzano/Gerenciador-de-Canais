import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMembroCanal from "../../contextos/contexto-membro-canal";
import {
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";
export default function ConsultarGeradorConteúdo() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { geradorConteúdoCanalYoutube } = useContext(ContextoMembroCanal);
  const dados = {
    nome_gerador_conteúdo: geradorConteúdoCanalYoutube?.usuário?.nome,
    especialidade: geradorConteúdoCanalYoutube?.especialidade,
    anos_experiência: geradorConteúdoCanalYoutube?.anos_experiência,
  };
  const navegar = useNavigate();
  function retornarConsultarCanalYoutube() {
    navegar("/consultar-canal-youtube");
  }
  return (
    <div className={estilizarFlex()}>
      <Card
        title="Consultar Gerador Conteúdo"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Gerador Conteúdo*:
          </label>
          <InputText
            name="nome_gerador_conteúdor"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_gerador_conteúdo}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Especialidade*:
          </label>
          <InputText
            name="especialidade"
            className={estilizarInputText(null, 150, usuárioLogado.cor_tema)}
            value={dados.especialidade}
            autoResize
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Anos de Experiência*:
          </label>
          <InputNumber
            name="anos_experiência"
            size={5}
            value={dados.anos_experiência}
            inputClassName={estilizarInputText(null, usuárioLogado.cor_tema)}
            mode="decimal"
            min={1}
            disabled
          />
        </div>
        <Divider className={estilizarDivider(dados.cor_tema)} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarConsultarCanalYoutube}
          />
        </div>
      </Card>
    </div>
  );
}
