import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGeradorConteúdo from "../../contextos/contexto-gerador-conteúdo";
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
export default function ConsultarCompromisso() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { compromissoConsultado, setMembroCanalCompromissado } = useContext(
    ContextoGeradorConteúdo
  );
  const dados = {
    nome_membro_canal: compromissoConsultado?.membro_canal?.usuário?.nome,
    membro_exclusivo: compromissoConsultado?.membro_exclusivo,
    descrição: compromissoConsultado?.descrição,
    nome_canal_youtube: compromissoConsultado?.canal_youtube?.nome,
  };
  const navegar = useNavigate();
  function retornarPesquisarCompromissos() {
    navegar("../pesquisar-compromissos");
  }
  function consultarMembroCanalCompromissado() {
    setMembroCanalCompromissado(compromissoConsultado.membro_canal);
    navegar("../consultar-membro-canal-compromissado");
  }
  return (
    <div className={estilizarFlex()}>
      <Card
        title="Consultar Compromisso"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Membro Canal*:
          </label>
          <InputText
            name="nome_membro_canal"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_membro_canal}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Membro Exclusivo*:
          </label>
          <Checkbox
            name="membro_exclusivo"
            checked={dados.membro_exclusivo}
            className={estilizarCheckbox()}
            autoResize
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            descrição*:
          </label>
          <InputTextarea
            name="descrição"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.descrição}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Nome Canal*
          </label>
          <InputText
            name="nome_canal_youtube"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_canal_youtube}
            disabled
          />
        </div>
        <Divider className={estilizarDivider()} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarPesquisarCompromissos}
          />
          <Button
            className={estilizarBotão()}
            label="Membro Canal"
            onClick={consultarMembroCanalCompromissado}
          />
        </div>
      </Card>
    </div>
  );
}
