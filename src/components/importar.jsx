import { useState } from 'react';
import * as XLSX from 'xlsx'; 
import '../csscomponents/importar.css';

function Importar() {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  // Função para quando você escolhe o arquivo no computador
  const selecionarArquivo = (e) => {
    if (e.target.files.length > 0) {
      setArquivoSelecionado(e.target.files[0]);
      setMensagem(""); 
    }
  };

  // Função para processar o arquivo quando clica no botão confirmar
  const processarEnvio = () => {
    if (!arquivoSelecionado) return;

    const leitor = new FileReader();

    leitor.onload = (evento) => {
      try {
        const dadosBinarios = evento.target.result;
        const livro = XLSX.read(dadosBinarios, { type: 'binary' });
        const nomeDaAba = livro.SheetNames[0];
        const planilha = livro.Sheets[nomeDaAba];
        const dadosJson = XLSX.utils.sheet_to_json(planilha);

        // Mapeia os dados garantindo que o ID da sua planilha seja usado
        const novosItens = dadosJson.map((linha) => ({
          id: Number(linha.ID) || Date.now() + Math.random(),
          codigo: String(linha.CODIGO || "S/C"),
          nome: String(linha.NOME || "Item sem Nome"),
          quantidade: Number(linha.QTD) || 0
        }));

        const listaAntiga = JSON.parse(localStorage.getItem("meu_inventario") || "[]");
        const listaNova = [...listaAntiga, ...novosItens];
        
        localStorage.setItem("meu_inventario", JSON.stringify(listaNova));
        setMensagem(`Sucesso! ${novosItens.length} itens importados.`);
        setArquivoSelecionado(null);
      } catch (err) {
        setMensagem("Erro ao ler o arquivo. Verifique se é um Excel válido.");
      }
    };

    leitor.readAsBinaryString(arquivoSelecionado);
  };

  return (
    <div className="importar-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Importar Planilha XLS</h2>
      
      <div className="upload-area" style={{ border: '2px dashed blueviolet', padding: '30px', borderRadius: '15px' }}>
        {/* Input escondido para usarmos o nosso botão bonito */}
        <input 
          type="file" 
          id="arquivo-input"
          accept=".xlsx, .xls" 
          onChange={selecionarArquivo} 
          style={{ display: 'none' }} 
        />
        
        <label htmlFor="arquivo-input" style={{ 
          cursor: 'pointer', 
          backgroundColor: '#eee', 
          padding: '10px 20px', 
          borderRadius: '5px',
          border: '1px solid #ccc',
          display: 'inline-block'
        }}>
          {arquivoSelecionado ? "📄 Arquivo Selecionado" : "📁 Escolher Arquivo Excel"}
        </label>

        {arquivoSelecionado && (
          <p style={{ marginTop: '10px', color: 'blueviolet', fontWeight: 'bold' }}>
            {arquivoSelecionado.name}
          </p>
        )}
      </div>

      <br />

      <button 
        onClick={processarEnvio}
        disabled={!arquivoSelecionado}
        className="btn-entrar"
        style={{
          opacity: arquivoSelecionado ? 1 : 0.5,
          cursor: arquivoSelecionado ? 'pointer' : 'not-allowed'
        }}
      >
        Confirmar e Enviar
      </button>

      {mensagem && (
        <p style={{ 
          marginTop: '20px', 
          color: mensagem.includes("Erro") ? 'red' : 'green',
          fontWeight: 'bold'
        }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default Importar;