import { createContext, useState } from "react";
const ContextoGeradorConteúdo = createContext();
export default ContextoGeradorConteúdo;
export function ProvedorGeradorConteúdo({ children }) {
  const [canalYoutubeConsultado, setCanalYoutubeConsultado] = useState({});
  const [compromissoConsultado, setCompromissoConsultado] = useState(null);
  const [membroCanalCompromissado, setMembroCanalCompromissado] =
    useState(null);
  return (
    <ContextoGeradorConteúdo.Provider
      value={{
        canalYoutubeConsultado,
        setCanalYoutubeConsultado,
        compromissoConsultado,
        setCompromissoConsultado,
        membroCanalCompromissado,
        setMembroCanalCompromissado,
      }}
    >
      {children}
    </ContextoGeradorConteúdo.Provider>
  );
}
