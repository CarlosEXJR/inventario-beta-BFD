import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; 
import '../csscomponents/importar.css';

function Importar() {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [historicoImport, setHistoricoImport] = useState([]);

  // Carrega o histórico de importações ao abrir a página
  useEffect(() => {
    const salvo = localStorage.getItem("historico_importacao");
    if (salvo) setHistoricoImport(JSON.parse(salvo));
  }, []);

  const selecionarArquivo = (e) => {
    if (e.target.files.length > 0) {
      setArquivoSelecionado(e.target.files[0]);
      setMensagem(""); 
    }
  };

  const processarEnvio = () => {
    if (!arquivoSelecionado) return;
    const leitor = new FileReader();

    leitor.onload = (evento) => {
      try {
        const dadosBinarios = evento.target.result;
        const livro = XLSX.read(dadosBinarios, { type: 'binary' });
        const planilha = livro.Sheets[livro.SheetNames[0]];
        const dadosJson = XLSX.utils.sheet_to_json(planilha);

        const novosItens = dadosJson.map((linha) => {
          const linhaLimpa = {};
          Object.keys(linha).forEach(chave => {
            linhaLimpa[chave.trim().toUpperCase()] = linha[chave];
          });

          return {
            id: Number(linhaLimpa.ID) || Date.now() + Math.random(),
            codigo: String(linhaLimpa.CODIGO || linhaLimpa.COD || linhaLimpa.REF || "S/C"),
            nome: String(linhaLimpa.NOME || linhaLimpa.DESCRICAO || linhaLimpa.DESCRIÇÃO || linhaLimpa.PRODUTO || "Item sem Nome"),
            quantidade: Number(linhaLimpa.QTD || linhaLimpa.QUANTIDADE || linhaLimpa.ESTOQUE) || 0
          };
        });

        const listaAntiga = JSON.parse(localStorage.getItem("meu_inventario") || "[]");
        localStorage.setItem("meu_inventario", JSON.stringify([...listaAntiga, ...novosItens]));
        
        // SALVAR NO HISTÓRICO DE IMPORTAÇÃO
        const novaImportacao = {
          id: Date.now(),
          nomeArquivo: arquivoSelecionado.name,
          data: new Date().toLocaleString(),
          qtdItens: novosItens.length
        };
        const novoHistorico = [novaImportacao, ...historicoImport].slice(0, 5); // Mantém os últimos 5
        setHistoricoImport(novoHistorico);
        localStorage.setItem("historico_importacao", JSON.stringify(novoHistorico));

        setMensagem(`Sucesso! ${novosItens.length} itens importados.`);
        setArquivoSelecionado(null);
      } catch (err) {
        setMensagem("Erro ao ler o arquivo. Verifique se é um Excel válido.");
      }
    };
    leitor.readAsBinaryString(arquivoSelecionado);
  };

 // ... mantenha os imports e funções de lógica iguais ...

  // ... (mantenha seus imports e lógica de processarEnvio iguais)

  return (
    <div className="importar-container">
      <h1 className="titulo-sessao">Painel de Importação</h1>
      
      <div className="importar-flex-layout">
        
        {/* LADO ESQUERDO: Ocupa um espaço fixo e parece um botão de card */}
        <div className="importar-sidebar">
           <input 
            type="file" 
            id="arquivo-input"
            accept=".xlsx, .xls" 
            onChange={selecionarArquivo} 
            style={{ display: 'none' }} 
          />
          <label htmlFor="arquivo-input" className={`area-upload-lateral ${arquivoSelecionado ? 'ativo' : ''}`}>
            <span className="icon-upload">📁</span>
            <span className="text-upload">
              {arquivoSelecionado ? "Alterar Arquivo" : "Selecionar Excel"}
            </span>
            {arquivoSelecionado && <span className="nome-arquivo-badge">{arquivoSelecionado.name}</span>}
          </label>
        </div>

        {/* LADO DIREITO: Card centralizado com Confirmar + Histórico */}
        <div className="card-importar-compacto">
          <div className="secao-confirmacao">
            <h3>Ações</h3>
            <button 
              onClick={processarEnvio}
              disabled={!arquivoSelecionado}
              className="btn-confirmar-import"
            >
              Confirmar e Enviar
            </button>
            {mensagem && (
              <p className={mensagem.includes("Erro") ? "msg-erro-small" : "msg-sucesso-small"}>
                {mensagem}
              </p>
            )}
          </div>

          <div className="linha-divisor"></div>

          <div className="secao-historico">
            <h3>Últimos Uploads</h3>
            {historicoImport.length === 0 ? (
              <p className="txt-vazio">Nenhuma importação recente.</p>
            ) : (
              <ul className="lista-historico">
                {historicoImport.map(item => (
                  <li key={item.id}>
                    <div className="hist-info">
                      <strong>{item.nomeArquivo}</strong>
                      <span>{item.data}</span>
                    </div>
                    <span className="hist-qtd">+{item.qtdItens}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Importar;