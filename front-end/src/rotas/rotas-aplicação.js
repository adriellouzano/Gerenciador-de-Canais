import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarGeradorConteúdo from "../páginas/gerador-conteúdo/cadastrar-gerador-conteúdo";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarMembroCanal from "../páginas/membro-canal/cadastrar-membro-canal";
import { ProvedorGeradorConteúdo } from "../contextos/contexto-gerador-conteúdo";
import { ProvedorMembroCanal } from "../contextos/contexto-membro-canal";
import RotasGeradorConteúdo from "./rotas-gerador-conteúdo";
import RotasMembroCanal from "./rotas-membro-canal";
import AdministrarCanaisYoutube from "../páginas/gerador-conteúdo/administrar-canais-youtube";
import CadastrarCanalYoutube from "../páginas/gerador-conteúdo/cadastrar-canal-youtube";
import AdministrarCompromissos from "../páginas/membro-canal/administrar-compromissos";
import CadastrarCompromisso from "../páginas/membro-canal/cadastrar-compromisso";
import PesquisarCanaisYoutube from "../páginas/membro-canal/pesquisar-canais-youtube";
import ConsultarCanalYoutube from "../páginas/membro-canal/consultar-canal-youtube";
import PesquisarCompromissos from "../páginas/gerador-conteúdo/pesquisar-compromissos";
import ConsultarCompromisso from "../páginas/gerador-conteúdo/consultar-compromisso";
import ConsultarMembroCanal from "../páginas/gerador-conteúdo/consultar-membro-canal";
import ConsultarGeradorConteúdo from "../páginas/membro-canal/consultar-gerador-conteúdo";
export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RecuperarAcesso />} path="recuperar-acesso" />
        <Route element={<LogarUsuário />} path="/" />
        <Route element={<CadastrarUsuário />} path="criar-usuario" />
        <Route element={<RotasUsuárioLogado />}>
          <Route element={<PáginaInicial />} path="pagina-inicial" />
          <Route element={<CadastrarUsuário />} path="atualizar-usuario" />
          <Route
            element={
              <ProvedorGeradorConteúdo>
                <RotasGeradorConteúdo />
              </ProvedorGeradorConteúdo>
            }
          >
            <Route
              element={<CadastrarGeradorConteúdo />}
              path="cadastrar-gerador-conteudo"
            />
            <Route
              element={<AdministrarCanaisYoutube />}
              path="administrar-canais-youtube"
            />
            <Route
              element={<CadastrarCanalYoutube />}
              path="cadastrar-canal-youtube"
            />
            <Route
              element={<PesquisarCompromissos />}
              path="pesquisar-compromissos"
            />
            <Route
              element={<ConsultarCompromisso />}
              path="consultar-compromisso"
            />
            <Route
              element={<ConsultarMembroCanal />}
              path="consultar-membro-canal-compromissado"
            />
          </Route>
          <Route
            element={
              <ProvedorMembroCanal>
                <RotasMembroCanal />
              </ProvedorMembroCanal>
            }
          >
            <Route
              element={<CadastrarMembroCanal />}
              path="cadastrar-membro-canal"
            />
            <Route
              element={<AdministrarCompromissos />}
              path="administrar-compromissos"
            />
            <Route
              element={<CadastrarCompromisso />}
              path="cadastrar-compromisso"
            />
            <Route
              element={<PesquisarCanaisYoutube />}
              path="pesquisar-canais-youtube"
            />
            <Route
              element={<ConsultarCanalYoutube />}
              path="consultar-canal-youtube"
            />
            <Route
              element={<ConsultarGeradorConteúdo />}
              path="consultar-gerador-conteúdo-canal-youtube"
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
