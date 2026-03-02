import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGeradorConteúdo from "../../contextos/contexto-gerador-conteúdo";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import {
  TAMANHOS,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputMask,
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";
export default function ConsultarAluno() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { membroCanalCompromissado } = useContext(ContextoGeradorConteúdo);
  const dados = {
    nome: membroCanalCompromissado?.usuário?.nome,
    tipo_participação: membroCanalCompromissado?.tipo_participação,
    data_entrada: membroCanalCompromissado?.data_entrada,
    data_nascimento: membroCanalCompromissado?.data_nascimento,
    telefone: membroCanalCompromissado?.telefone,
  };
  const navegar = useNavigate();
  function retornarConsultarCompromisso() {
    navegar("../consultar-compromisso");
  }
  return (
    <div className={estilizarFlex()}>
      <Card
        title="Consultar Membro Canal"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Membro Canal*:
          </label>
          <InputText
            name="membro_canal"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Tipo Participação*:
          </label>
          <InputText
            name="tipo_participação"
            className={estilizarInputText(null, 300, usuárioLogado.cor_tema)}
            value={dados.tipo_participação}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data de Entrada*:
          </label>
          <InputMask
            name="data_entrada"
            autoClear
            size={TAMANHOS.ANO}
            mask={ANO_MÁSCARA}
            value={dados.data_entrada}
            className={estilizarInputMask(null, usuárioLogado.cor_tema)}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data de Nascimento*:
          </label>
          <InputText
            name="data_nascimento"
            type="date"
            value={dados.data_nascimento}
            className={estilizarInputText(null, usuárioLogado.cor_tema)}
            disabled
          />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(dados.cor_tema)}>Telefone*:</label>
          <InputMask
            name="telefone"
            autoClear
            size={TAMANHOS.TELEFONE}
            mask={TELEFONE_MÁSCARA}
            className={estilizarInputMask(null, dados.cor_tema)}
            value={dados.telefone}
            disabled
          />
        </div>
        <Divider className={estilizarDivider(dados.cor_tema)} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarConsultarCompromisso}
          />
        </div>
      </Card>
    </div>
  );
}
