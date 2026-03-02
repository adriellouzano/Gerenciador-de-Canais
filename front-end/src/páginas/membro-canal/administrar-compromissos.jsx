import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMembroCanal from "../../contextos/contexto-membro-canal";
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarCompromissosMembroCanal } from "../../serviços/serviços-membro-canal";
import {
  TAMANHOS,
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarColumnHeader,
  estilizarColunaConsultar,
  estilizarDataTable,
  estilizarDataTablePaginator,
  estilizarDivider,
  estilizarFilterMenu,
  estilizarFlex,
  estilizarTriStateCheckbox,
} from "../../utilitários/estilos";
export default function AdministrarCompromissos() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const {
    compromissoConsultado,
    setCompromissoConsultado,
    setCanalYoutubeSelecionado,
  } = useContext(ContextoMembroCanal);
  const [listaCompromissos, setListaCompromissos] = useState([]);
  const navegar = useNavigate();
  const opçõesPúblicoPrincipal = [
    { label: "Infantil", value: "Infantil" },
    { label: "Adolescentes", value: "Adolescentes" },
    { label: "Adulto", value: "Adulto" },
    { label: "Famílias", value: "Famílias" },
  ];
  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }
  function adicionarCompromisso() {
    setCompromissoConsultado(null);
    setCanalYoutubeSelecionado(null);
    navegar("../cadastrar-compromisso");
  }
  function ConsultarTemplate(compromisso) {
    function consultar() {
      setCompromissoConsultado(compromisso);
      setCanalYoutubeSelecionado(null);
      navegar("../cadastrar-compromisso");
    }
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          compromissoConsultado?.id === compromisso.id
        )}
        tooltip="Consultar compromisso"
        tooltipOptions={{ position: "top" }}
        onClick={consultar}
      />
    );
  }
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event) {
      return opções.filterCallback(event.value, opções.index);
    }
    return (
      <Dropdown
        value={opções.value}
        options={opçõesPúblicoPrincipal}
        placeholder="Selecione"
        onChange={alterarFiltroDropdown}
        showClear
      />
    );
  }
  function BooleanBodyTemplate(compromisso) {
    if (compromisso.membro_exclusivo) return "Sim";
    else return "Não";
  }

  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) {
      return opções.filterCallback(event.value);
    }
    return (
      <div>
        <label>Membro Exclusivo:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)}
          value={opções.value}
          onChange={alterarFiltroTriState}
        />
      </div>
    );
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarCompromissosMembroCanal() {
      try {
        const response = await serviçoBuscarCompromissosMembroCanal(
          usuárioLogado.cpf
        );
        if (!desmontado && response.data) setListaCompromissos(response.data);
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
    buscarCompromissosMembroCanal();
    return () => (desmontado = true);
  }, [usuárioLogado.cpf]);
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title="Administrar Compromissos"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum compromisso encontrado."
          value={listaCompromissos}
          responsiveLayout="scroll"
          breakpoint="490px"
          removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(
            usuárioLogado.cor_tema
          )}
        >
          <Column
            bodyClassName={estilizarColunaConsultar()}
            body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
          />
          <Column
            field="canal_youtube.gerador_conteúdo.usuário.nome"
            header="Gerador Conteúdo"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="canal_youtube.público_principal"
            header="Público Principal"
            filter
            filterMatchMode="equals"
            filterElement={DropdownÁreaTemplate}
            showClearButton={false}
            showFilterOperator={false}
            showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()}
            showFilterMenuOptions={false}
            sortable
          />
          <Column
            field="canal_youtube.nome"
            header="Nome"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="membro_exclusivo"
            header="Membro Exclusivo"
            dataType="boolean"
            filter
            showFilterOperator={false}
            body={BooleanBodyTemplate}
            filterElement={BooleanFilterTemplate}
            filterMatchMode="equals"
            showClearButton={false}
            showAddButton={false}
            filterMenuClassName={estilizarFilterMenu()}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
        </DataTable>
        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarPáginaInicial}
        />
        <Button
          className={estilizarBotão()}
          label="Adicionar"
          onClick={adicionarCompromisso}
        />
      </Card>
    </div>
  );
}
