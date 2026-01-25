// Importamos os Hooks necessários: useState para o estado do tema e useEffect para aplicar as mudanças
import { useState, useEffect } from 'react';
import logoMarca from '../assets/img/logo1.png';

function Menu({ mudarTela }) {
  // Inicializamos o estado 'dark'. Ele tenta ler a preferência salva no navegador; 
  // se não houver nada (primeiro acesso), ele começa como 'true' (Modo Escuro)
  const [dark, setDark] = useState(true) 

  // O useEffect executa toda vez que a variável 'dark' sofrer uma alteração
  useEffect(() => {
    // Aplica o atributo 'data-theme' na tag <html> do site. 
    // É isso que faz o CSS trocar as variáveis :root pelas [data-theme='dark']
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    // Barra superior com posicionamento fixo e cores baseadas em var(--bg-menu)
    <header className="menu-topo">
      
      <div className="menu-titulo">
            <img src={logoMarca} alt="Solutions Company" className="logo-menu" />
      </div>

      {/* Centro: Navegação principal. Cada botão chama a função de troca de tela */}
      <nav className="menu-central">
        <button onClick={() => mudarTela("home")}>Home</button>
        <button onClick={() => mudarTela("inventario")}>Inventário</button>
        <button onClick={() => mudarTela("importar")}>Importar</button>
        <button onClick={() => mudarTela("exportar")}>Exportar</button>
      </nav>

      {/* Lado Direito: Utilitários de sistema */}
      <div className="menu-direita">
        {/* Botão de Alternância de Tema: Inverte o valor de 'dark' (true vira false e vice-versa) */}
        <button className="btn-tema" onClick={() => setDark(!dark)}>
          {/* Renderização condicional do texto e ícone baseada no tema atual */}
          {dark ? '🌙 Escuro' : '☀️ Claro'}
        </button>
        
        {/* Botão Sair: Geralmente redireciona o usuário de volta para a tela de Login */}
        <button className="btn-sair" onClick={() => mudarTela("login")}>Sair</button>
      </div>
    </header>
  );
}

export default Menu;