import servidor from "./servidor";
export function serviçoCadastrarMembroCanal(membro_canal) {
  return servidor.post("/membros_canal", membro_canal);
}
export function serviçoAtualizarMembroCanal(membro_canal) {
  return servidor.patch("/membros_canal", membro_canal);
}
export function serviçoBuscarMembroCanal(cpf) {
  return servidor.get(`/membros_canal/${cpf}`);
}
export function serviçoCadastrarCompromisso(compromisso) {
  return servidor.post("/membros_canal/compromissos", compromisso);
}
export function serviçoRemoverCompromisso(id) {
  return servidor.delete(`/membros_canal/compromissos/${id}`);
}
export function serviçoBuscarCompromissosMembroCanal(cpf) {
  return servidor.get(`/membros_canal/compromissos/membro-canal/${cpf}`);
}
export function serviçoBuscarCanaisYoutube() {
  return servidor.get("/membros_canal/compromissos/canais-youtube");
}
