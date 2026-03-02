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
import ContextoGeradorConteúdo from "../../contextos/contexto-gerador-conteúdo";
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarCompromissosCanalYoutube } from "../../serviços/serviços-gerador-conteúdo";
import {
  TAMANHOS,
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
export default function PesquisarCompromissos() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const {
    compromissoConsultado,
    setCompromissoConsultado,
    canalYoutubeConsultado,
  } = useContext(ContextoGeradorConteúdo);
  const [listaCompromissos, setListaCompromissos] = useState([]);
  const navegar = useNavigate();
  const opçõesPúblicoPrincipal = [
    { label: "Infantil", value: "Infantil" },
    { label: "Adolecentes", value: "Adolecentes" },
    { label: "Adulto", value: "Adulto" },
    { label: "Famílias", value: "Famílias" },
  ];
  function retornarCadastrarCanalYoutube() {
    setCompromissoConsultado(null);
    navegar("../cadastrar-canal-youtube");
  }
  function ConsultarTemplate(compromisso) {
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          compromissoConsultado?.id === compromisso.id
        )}
        tooltip="Consultar compromisso"
        tooltipOptions={{ position: "top" }}
        onClick={() => {
          setCompromissoConsultado(compromisso);
          navegar("../consultar-compromisso");
        }}
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
    async function buscarCompromissosCanalYoutube() {
      try {
        const response = await serviçoBuscarCompromissosCanalYoutube(
          canalYoutubeConsultado?.id
        );
        if (!desmontado && response.data) setListaCompromissos(response.data);
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
    buscarCompromissosCanalYoutube();
    return () => (desmontado = true);
  }, [canalYoutubeConsultado?.id]);
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center" />
      <Card
        title="compromissos Cadastrados"
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
            field="membro_canal.usuário.nome"
            header="Membro Canal"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="canal_youtube.nome"
            header="Canal Youtube"
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
            field="membro_exclusivo"
            header="membro exclusivo"
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
          onClick={retornarCadastrarCanalYoutube}
        />
      </Card>
    </div>
  );
}
