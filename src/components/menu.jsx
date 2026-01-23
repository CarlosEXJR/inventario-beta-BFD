import { useState, useEffect } from 'react';

function Menu({ mudarTela }) {
  // O useState começa como 'true' (escuro) ou busca o que estiver salvo no navegador
  const [dark, setDark] = useState(() => {
    const salvo = localStorage.getItem("tema_preferido");
    return salvo ? JSON.parse(salvo) : true;
  });

  // O useEffect "vigia" a variável 'dark' e troca a etiqueta do site
  useEffect(() => {
    // Adiciona ou remove a etiqueta data-theme="dark" na tag principal do site
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    // Salva a escolha para o usuário não ter que mudar toda vez que abrir o site
    localStorage.setItem("tema_preferido", JSON.stringify(dark));
  }, [dark]);

  return (
      <header className="menu-topo">
  {/* 1. Lado Esquerdo: Logo ou Título */}
  <h2 className="menu-titulo">Solutions</h2>

  {/* 2. Centro: Botões Principais */}
  <nav className="menu-central">
    <button onClick={() => mudarTela("home")}>Home</button>
    <button onClick={() => mudarTela("inventario")}>Inventário</button>
    <button onClick={() => mudarTela("importar")}>Importar</button>
    <button onClick={() => mudarTela("exportar")}>Exportar</button>
  </nav>

  {/* 3. Lado Direito: Tema e Sair */}
  <div className="menu-direita">
    <button className="btn-tema" onClick={() => setDark(!dark)}>
      {dark ? '🌙 Escuro' : '☀️ Claro'}
    </button>
    <button className="btn-sair" onClick={() => mudarTela("login")}>Sair</button>
  </div>
</header>
  );
}

export default Menu;