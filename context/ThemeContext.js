import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [modoClaro, setModoClaro] = useState(false);

  const alternarTema = () => setModoClaro((prev) => !prev);

  // Paleta oficial completa aplicada aos dois modos
  const cores = modoClaro
    ? {
        fundo: '#FAEADD',        // Rosarian (Fundo claro principal)
        texto: '#222023',        // Wet Charcoal (Textos principais)
        roxo: '#522A6F',         // Purple Seduction (Botões e destaques)
        rosa: '#522A6F',         // Ajustado para contraste no claro
        borda: '#522A6F',        // Bordas dos inputs e cards
        dourado: '#522A6F',      // Ajustado para legibilidade
        acento: '#DDAAFF',       // Testosterose
        cardFundo: '#FAEADD',    // Fundo dos cards no modo claro
        placeholder: '#522A6F',  // Cor do placeholder nos inputs
      }
    : {
        fundo: '#222023',        // Wet Charcoal (Fundo escuro principal)
        texto: '#FAEADD',        // Rosarian (Textos principais)
        roxo: '#522A6F',         // Purple Seduction
        rosa: '#F29CB7',         // Harmonious Rose
        borda: '#522A6F',        // Bordas
        dourado: '#FBCF4F',      // Solarized (Datas, luas, destaques)
        acento: '#DDAAFF',       // Testosterose
        cardFundo: '#222023',    // Fundo dos cards no modo escuro
        placeholder: '#F29CB7',  // Cor do placeholder nos inputs
      };

  return (
    <ThemeContext.Provider value={{ modoClaro, alternarTema, cores }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}