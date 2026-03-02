export default function formatarPerfil(perfil) {
  switch (perfil) {
    case "gerador_conteúdo":
      return "Gerador Conteúdo";
    case "membro_canal":
      return "Membro Canal";
    default:
      return;
  }
}
