import servidor from "./servidor";
export function serviçoCadastrarGeradorConteúdo(gerador_conteúdo) {
  return servidor.post("/geradores_conteudo", gerador_conteúdo);
}
export function serviçoBuscarGeradorConteúdo(cpf) {
  return servidor.get(`/geradores_conteudo/${cpf}`);
}
export function serviçoAtualizarGeradorConteúdo(gerador_conteúdo) {
  return servidor.patch("/geradores_conteudo", gerador_conteúdo);
}
export function serviçoCadastrarCanalYoutube(canal_youtube) {
  return servidor.post("/geradores_conteudo/canais-youtube", canal_youtube);
}
export function serviçoAlterarCanalYoutube(canal_youtube) {
  return servidor.patch("/geradores_conteudo/canais-youtube", canal_youtube);
}
export function serviçoRemoverCanalYoutube(id) {
  return servidor.delete(`/geradores_conteudo/canais-youtube/${id}`);
}
export function serviçoBuscarCanaisYoutubeGeradorConteúdo(cpf) {
  return servidor.get(
    `/geradores_conteudo/canais-youtube/gerador-conteudo/${cpf}`
  );
}
export function serviçoBuscarCompromissosCanalYoutube(id_canal_youtube) {
  return servidor.get(`/geradores_conteudo/compromissos/${id_canal_youtube}`);
}
