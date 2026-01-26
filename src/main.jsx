import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * CONFIGURAÇÕES GLOBAIS DO NAVEGADOR
 * Estas linhas manipulam o DOM fora do ambiente React para personalizar a aba.
 */

// Define o nome que aparecerá na aba do navegador
document.title = "Sistema de Inventário | Solutions";

// Localiza a tag <link rel="icon"> no cabeçalho do HTML
const link = document.querySelector("link[rel~='icon']");

// Se a tag existir, altera o atributo 'href' para o caminho da sua logo
if (link) {
  // Nota: 'logo1.png' deve estar obrigatoriamente na pasta /public
  link.href = 'logo1.png'; 
}

/**
 * PONTO DE ENTRADA DA APLICAÇÃO (BOOTSTRAP)
 * 1. Busca o elemento 'root' no arquivo index.html.
 * 2. Cria a raiz do React (createRoot).
 * 3. Renderiza o componente principal <App /> dentro dessa raiz.
 */
createRoot(document.getElementById('root')).render(
  /**
   * <StrictMode>
   * Ferramenta de auxílio ao desenvolvimento que ativa verificações extras
   * e avisos sobre práticas obsoletas ou comportamentos inesperados.
   */
  <StrictMode>
    <App />
  </StrictMode>,
)