import { createContext, useState } from "react";
const ContextoMembroCanal = createContext();
export default ContextoMembroCanal;
export function ProvedorMembroCanal({ children }) {
  const [compromissoConsultado, setCompromissoConsultado] = useState({});
  const [canalYoutubeConsultado, setCanalYoutubeConsultado] = useState({});
  const [canalYoutubeSelecionado, setCanalYoutubeSelecionado] = useState({});
  const [canalYoutubeCompromisso, setCanalYoutubeCompromisso] = useState({});
  const [geradorConteúdoCanalYoutube, setGeradorConteúdoCanalYoutube] =
    useState({});
  return (
    <ContextoMembroCanal.Provider
      value={{
        compromissoConsultado,
        setCompromissoConsultado,
        canalYoutubeConsultado,
        setCanalYoutubeConsultado,
        canalYoutubeSelecionado,
        setCanalYoutubeSelecionado,
        canalYoutubeCompromisso,
        setCanalYoutubeCompromisso,
        geradorConteúdoCanalYoutube,
        setGeradorConteúdoCanalYoutube,
      }}
    >
      {children}
    </ContextoMembroCanal.Provider>
  );
}
