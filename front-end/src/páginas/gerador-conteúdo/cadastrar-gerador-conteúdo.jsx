import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoCadastrarGeradorConteúdo,
  serviçoBuscarGeradorConteúdo,
  serviçoAtualizarGeradorConteúdo,
} from "../../serviços/serviços-gerador-conteúdo";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarDropdown,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputNumber,
  estilizarLabel,
} from "../../utilitários/estilos";
export default function CadastrarGeradorConteúdo() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({
    especialidade: "",
    anos_experiência: "",
  });
  const [erros, setErros] = useState({});
  const [cpfExistente, setCpfExistente] = useState(false);
  const navegar = useNavigate();
  const opçõesEspecialidade = [
    { label: "Jogos", value: "jogos" },
    { label: "Vlogs", value: "vlogs" },
    { label: "Tecnologia", value: "tecnologia" },
    { label: "Educação", value: "educacao" },
    { label: "Arte", value: "arte" },
    { label: "Música", value: "musica" },
    { label: "Cúlinaria", value: "culinaria" },
    { label: "Agricultura", value: "agricultura" },
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
    if (usuárioLogado?.cadastrado) return "Alterar Gerador Conteúdo";
    else return "Cadastrar Gerador Conteúdo";
  }
  async function atualizarGeradorConteúdo() {
    if (validarCampos()) {
      try {
        const response = await serviçoAtualizarGeradorConteúdo({
          ...dados,
          cpf: usuárioLogado.cpf,
        });
        if (response)
          mostrarToast(
            referênciaToast,
            "Gerador Conteúdo atualizado com sucesso!",
            "sucesso"
          );
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }
  async function cadastrarGeradorConteúdo() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarGeradorConteúdo({
          ...dados,
          usuário_info: usuárioLogado,
          especialidade: dados.especialidade,
          anos_experiência: dados.anos_experiência,
        });
        if (response.data)
          setUsuárioLogado((usuário) => ({
            ...usuário,
            status: response.data.status,
            token: response.data.token,
          }));
        mostrarToast(
          referênciaToast,
          "Gerador Conteúdo cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        setCpfExistente(true);
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }
  function labelBotãoSalvar() {
    if (usuárioLogado?.cadastrado) return "Alterar";
    else return "Cadastrar";
  }
  function açãoBotãoSalvar() {
    if (usuárioLogado?.cadastrado) atualizarGeradorConteúdo();
    else cadastrarGeradorConteúdo();
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
    async function buscarDadosGeradorConteúdo() {
      try {
        const response = await serviçoBuscarGeradorConteúdo(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados((dados) => ({
            ...dados,
            especialidade: response.data.especialidade,
            anos_experiência: response.data.anos_experiência,
          }));
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    if (usuárioLogado?.cadastrado) buscarDadosGeradorConteúdo();
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
            Especialidade*:
          </label>
          <Dropdown
            name="especialidade"
            className={estilizarDropdown(
              erros.especialidade,
              usuárioLogado.cor_tema
            )}
            value={dados.especialidade}
            options={opçõesEspecialidade}
            onChange={alterarEstado}
            placeholder="-- Selecione --"
          />
          <MostrarMensagemErro mensagem={erros.especialidade} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
            Anos de Experiência*:
          </label>
          <InputNumber
            name="anos_experiência"
            size={5}
            value={dados.anos_experiência}
            onValueChange={alterarEstado}
            mode="decimal"
            inputClassName={estilizarInputNumber(
              erros.anos_experiência,
              usuárioLogado.cor_tema
            )}
          />
          <MostrarMensagemErro mensagem={erros.anos_experiência} />
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
