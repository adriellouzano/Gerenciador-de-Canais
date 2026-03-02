import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import {
  serviçoCadastrarMembroCanal,
  serviçoAtualizarMembroCanal,
  serviçoBuscarMembroCanal,
} from "../../serviços/serviços-membro-canal";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  TAMANHOS,
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarDropdown,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputMask,
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarMembroCanal() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({
    tipo_participação: "",
    data_entrada: "",
    data_nascimento: "",
    telefone: "",
  });
  const [erros, setErros] = useState({});
  const [cpfExistente, setCpfExistente] = useState(false);
  const navegar = useNavigate();
  const opçõesTipoParticipação = [
    { label: "Assinante", value: "Assinante" },
    { label: "Moderador", value: "Moderador" },
    { label: "Colaborador", value: "Colaborador" },
  ];
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    const valor = event.target.value;
    setDados({ ...dados, [chave]: valor });
  }
  function validarCampos() {
    let errosCamposObrigatórios;
    errosCamposObrigatórios = validarCamposObrigatórios(dados);
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }
  function títuloFormulário() {
    if (usuárioLogado?.cadastrado) return "Alterar  Membro Canal";
    else return "Cadastrar Membro Canal";
  }
  async function cadastrarMembroCanal() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarMembroCanal({
          ...dados,
          usuário_info: usuárioLogado,
          tipo_participação: dados.tipo_participação,
          data_entrada: dados.data_entrada,
          telefone: dados.telefone,
          data_nascimento: dados.data_nascimento,
        });
        if (response.data)
          setUsuárioLogado((usuário) => ({
            ...usuário,
            status: response.data.status,
            token: response.data.token,
          }));
        mostrarToast(
          referênciaToast,
          "Membro Canal cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        setCpfExistente(true);
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }
  async function atualizarMembroCanal() {
    if (validarCampos()) {
      try {
        const response = await serviçoAtualizarMembroCanal({
          ...dados,
          cpf: usuárioLogado.cpf,
        });
        if (response)
          mostrarToast(
            referênciaToast,
            "Membro Canal atualizado com sucesso!",
            "sucesso"
          );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }
  function labelBotãoSalvar() {
    if (usuárioLogado?.cadastrado) return "Alterar";
    else return "Cadastrar";
  }
  function açãoBotãoSalvar() {
    if (usuárioLogado?.cadastrado) atualizarMembroCanal();
    else cadastrarMembroCanal();
  }
  function redirecionar() {
    if (cpfExistente) {
      setUsuárioLogado(null);
      navegar("/criar-usuario");
    } else {
      setUsuárioLogado((usuárioLogado) => ({
        ...usuárioLogado,
        cadastrado: true,
      }));
      navegar("/pagina-inicial");
    }
  }
  useEffect(() => {
    let desmontado = false;
    async function buscarDadosMembroCanal() {
      try {
        const response = await serviçoBuscarMembroCanal(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados((dados) => ({
            ...dados,
            tipo_participação: response.data.tipo_participação,
            data_entrada: response.data.data_entrada,
            telefone: response.data.telefone,
            data_nascimento: response.data.data_nascimento,
          }));
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    if (usuárioLogado?.cadastrado) buscarDadosMembroCanal();
    return () => (desmontado = true);
  }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);

  return (
    <div className={estilizarFlex()}>
      <Toast
        ref={referênciaToast}
        onHide={redirecionar}
        position="bottom-center"
      />
      <Card
        title={títuloFormulário()}
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Tipo Participação*:
          </label>
          <Dropdown
            name="tipo_participação"
            className={estilizarDropdown(
              erros.tipo_participação,
              usuárioLogado.cor_tema
            )}
            value={dados.tipo_participação}
            options={opçõesTipoParticipação}
            onChange={alterarEstado}
            placeholder="-- Selecione --"
          />
          <MostrarMensagemErro mensagem={erros.tipo_participação} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data Entrada*:
          </label>
          <InputMask
            name="data_entrada"
            autoClear
            size={TAMANHOS.ANO}
            onChange={alterarEstado}
            className={estilizarInputMask(
              erros.data_entrada,
              usuárioLogado.cor_tema
            )}
            mask={ANO_MÁSCARA}
            value={dados.data_entrada}
          />
          <MostrarMensagemErro mensagem={erros.ano_ingresso} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Data de Nascimento*:
          </label>
          <InputText
            name="data_nascimento"
            type="date"
            value={dados.data_nascimento}
            className={estilizarInputText(
              erros.data_nascimento,
              usuárioLogado.cor_tema
            )}
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.data_nascimento} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Telefone*:
          </label>
          <InputMask
            name="telefone"
            autoClear
            size={TAMANHOS.TELEFONE}
            onChange={alterarEstado}
            className={estilizarInputMask(
              erros.telefone,
              usuárioLogado.cor_tema
            )}
            mask={TELEFONE_MÁSCARA}
            value={dados.telefone}
          />
          <MostrarMensagemErro mensagem={erros.telefone} />
        </div>
        <Divider className={estilizarDivider(dados.cor_tema)} />
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={redirecionar}
          />
          <Button
            className={estilizarBotão()}
            label={labelBotãoSalvar()}
            onClick={açãoBotãoSalvar}
          />
        </div>
      </Card>
    </div>
  );
}
