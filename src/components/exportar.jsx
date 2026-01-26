import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import '../csscomponents/exportar.css';

function Exportar() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem("historico_exportacao");
    if (dados) setHistorico(JSON.parse(dados));
  }, []);

  const exportarTudo = () => {
    const todosOsDados = localStorage.getItem("meu_inventario");
    if (!todosOsDados) return alert("Inventário vazio!");
    const folha = XLSX.utils.json_to_sheet(JSON.parse(todosOsDados));
    const livro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(livro, folha, "Geral");
    XLSX.writeFile(livro, `Inventario_Completo.xlsx`);
  };

  const baixarRelatorio = (relatorio) => {
    const folha = XLSX.utils.json_to_sheet(relatorio.dados);
    const livro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(livro, folha, "Busca");
    XLSX.writeFile(livro, `${relatorio.nome}.xlsx`);
  };

  const excluirRelatorio = (id) => {
    const novo = historico.filter(h => h.id !== id);
    setHistorico(novo);
    localStorage.setItem("historico_exportacao", JSON.stringify(novo));
  };

  return (
    <div className="exportar-container">
      <h1 className="titulo-sessao">Exportar Dados</h1>

      <div className="banner-exportar-geral">
        <div className="banner-texto">
          <h2>📦 Inventário Completo</h2>
          <p>Gere uma planilha com todos os itens cadastrados no sistema.</p>
        </div>
        <button className="btn-geral" onClick={exportarTudo}>
          🚀 Baixar Tudo (XLS)
        </button>
      </div>

      <h2 className="titulo-historico">Buscas Salvas</h2>
      
      <div className="exportar-grid">
        {historico.length === 0 ? (
          <p className="aviso-vazio">Nenhuma pesquisa salva encontrada.</p>
        ) : (
          historico.map((item) => (
            <div key={item.id} className="card-relatorio">
              <div className="card-header-mini">
                <span>📄 Relatório</span>
                <span>{item.data}</span>
              </div>
              <div className="card-body-mini">
                <h3>{item.nome}</h3>
                <div className="acoes">
                  <button className="btn-baixar-mini" onClick={() => baixarRelatorio(item)}>Baixar</button>
                  <button className="btn-excluir-mini" onClick={() => excluirRelatorio(item.id)}>🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Exportar;