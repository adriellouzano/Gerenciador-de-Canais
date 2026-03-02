import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoGeradorConteúdo from "../../contextos/contexto-gerador-conteúdo";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarCanaisYoutubeGeradorConteúdo } from "../../serviços/serviços-gerador-conteúdo";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  TAMANHOS,
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoTabela,
  estilizarCard,
  estilizarColunaConsultar,
  estilizarColumnHeader,
  estilizarDataTable,
  estilizarDataTablePaginator,
  estilizarDivider,
  estilizarFilterMenu,
  estilizarFlex,
  estilizarTriStateCheckbox,
} from "../../utilitários/estilos";
export default function AdministrarCanaisYoutube() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { canalYoutubeConsultado, setCanalYoutubeConsultado } = useContext(
    ContextoGeradorConteúdo
  );
  const [listaCanaisYoutube, setListaCanaisYoutube] = useState([]);
  const navegar = useNavigate();
  const opçõesPúblicoPrincipal = [
    { label: "Infantil", value: "Infantil" },
    { label: "Adolecentes", value: "Adolecentes" },
    { label: "Adulto", value: "Adulto" },
    { label: "Famílias", value: "Famílias" },
  ];
  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }
  function adicionarCanalYoutube() {
    setCanalYoutubeConsultado(null);
    navegar("../cadastrar-canal-youtube");
  }
  function ConsultarTemplate(canal_youtube) {
    function consultar() {
      setCanalYoutubeConsultado(canal_youtube);
      navegar("../cadastrar-canal-youtube");
    }
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          canalYoutubeConsultado?.id === canal_youtube.id
        )}
        tooltip="Consultar Canal"
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
  function BooleanBodyTemplate(canal_youtube) {
    if (canal_youtube.monetizado) return "Sim";
    else return "Não";
  }
  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) {
      return opções.filterCallback(event.value);
    }
    return (
      <div>
        <label>Canal Monetizado:</label>
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
    async function buscarCanaisYoutubeGeradorConteúdo() {
      try {
        const response = await serviçoBuscarCanaisYoutubeGeradorConteúdo(
          usuárioLogado.cpf
        );
        if (!desmontado && response.data) {
          setListaCanaisYoutube(response.data);
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "error");
      }
    }
    buscarCanaisYoutubeGeradorConteúdo();
    return () => (desmontado = true);
  }, [usuárioLogado.cpf]);

  return (
    <div className={estilizarFlex()}>
      <Card
        title="Administrar Canais"
        className={estilizarCard(usuárioLogado.cor_tema)}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum canal encontrado."
          value={listaCanaisYoutube}
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
            field="nome"
            header="Nome"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="público_principal"
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
            field="número_inscritos"
            header="Número Inscritos"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="monetizado"
            header="Canal Monetizado"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
            filterMatchMode="equals"
            filterElement={BooleanFilterTemplate}
            body={BooleanBodyTemplate}
            showClearButton={false}
            showAddButton={false}
            filterMenuClassName={estilizarFilterMenu()}
            dataType="boolean"
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
          onClick={adicionarCanalYoutube}
        />
      </Card>
    </div>
  );
}
