import '../csscomponents/inventario.css'
import { useState, useEffect } from "react"

function Inventario() {
  const [busca, setBusca] = useState("");

  // 1. Estado dos Itens (Dados Totais)
  const [itens, setItens] = useState(() => {
    const dadosSalvos = localStorage.getItem("meu_inventario");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [
      
    ];
  });

  const [historico, setHistorico] = useState(() => {
    const salvos = localStorage.getItem("historico_exportacao");
    return salvos ? JSON.parse(salvos) : [];
  });

  // Persistência
  useEffect(() => {
    localStorage.setItem("historico_exportacao", JSON.stringify(historico));
    localStorage.setItem("meu_inventario", JSON.stringify(itens));
  }, [historico, itens]);

  // 2. Lógica de Filtro 
  // Se busca estiver vazia, retorna tudo. Se tiver texto, filtra.
  const resultadosDaBusca = itens.filter(item => {
    const termo = busca.toLowerCase().trim();
    if (!termo) return true; // Se vazio, não filtra nada

    // Transforma a linha em texto para busca total
    const conteudoLinha = Object.values(item).join(" ").toLowerCase();
    return conteudoLinha.includes(termo);
  });

  const salvarPesquisaNoHistorico = () => {
    if (!busca.trim() || resultadosDaBusca.length === 0) {
        alert("Digite algo na busca antes de salvar!");
        return;
    }
    const nomeRelatorio = prompt("Nome do relatório:");
    if (!nomeRelatorio) return; 

    const novaEntrada = {
        id: Date.now(),
        nome: nomeRelatorio,
        data: new Date().toLocaleString(),
        dados: [...resultadosDaBusca] 
    };

    setHistorico([...historico, novaEntrada]);
    alert("Resultados salvos!");
  };

  return (
    <div className="inventario-container">
      <div className="inventario-header-flex">
        <div className="inventario-busca">
          <input 
              type="text"
              placeholder="Digite para filtrar..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)} 
          />
          {busca && <button className="btn-clear" onClick={() => setBusca("")}>✕</button>}
        </div>

        <button className="btn-salvar-busca" onClick={salvarPesquisaNoHistorico}>
            💾 Salvar Filtro
        </button>
      </div>

      <div className="inventario-contador">
        <p>
          {busca.trim() === "" 
            ? `Mostrando total de ${itens.length} itens` 
            : `Exibindo ${resultadosDaBusca.length} resultado(s) para sua busca`}
        </p>
      </div>

      <div className="tabela-wrapper">
        <table className="inventario-tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>COD.</th>
              <th>DESCRIÇÃO</th>
              <th>QTD</th>
            </tr>
          </thead>
          {/* O segredo: o <tbody> renderiza APENAS o array filtrado */}
          <tbody>
            {resultadosDaBusca.length > 0 ? (
              resultadosDaBusca.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id || index + 1}</td>
                  <td>{String(item.codigo || item.CODIGO || "S/C")}</td>
                  <td>{item.nome || item.NOME || item.descricao || item.DESCRICAO || "---"}</td>
                  <td>{item.quantidade ?? item.QUANTIDADE ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  Nenhum item encontrado para "{busca}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inventario;