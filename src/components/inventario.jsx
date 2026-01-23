import '../csscomponents/inventario.css'
import { useState, useEffect } from "react"

function Inventario() {
  const [modo, setModo] = useState("lista")
  const [busca, setBusca] = useState("");

  const [itens, setItens] = useState(() => {
    const dadosSalvos = localStorage.getItem("meu_inventario");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [
      { id: 1, codigo: "A001", nome: "Teclado Mecânico", quantidade: 10 },
      { id: 2, codigo: "M015", nome: "Monitor LED 24\"", quantidade: 5 }
    ];
  });

  useEffect(() => {
    localStorage.setItem("meu_inventario", JSON.stringify(itens));
  }, [itens]);

  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [quantidade, setQuantidade] = useState("")

  function abrirFormulario() {
    const proximoNumero = itens.length + 1
    const novoCodigo = "A" + proximoNumero.toString().padStart(3, "0")
    setCodigo(novoCodigo)
    setModo("formulario")
  }

  function adicionarItem() {
    const novoItem = {
      id: itens.length + 1,
      codigo,
      nome,
      quantidade: Number(quantidade),
      atualizado_em: new Date().toLocaleString()
    }
    setItens([...itens, novoItem])
    setCodigo(""); setNome(""); setQuantidade("");
    setModo("lista")
  }

  const itensFiltrados = itens.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase()) || 
    item.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="inventario-container">
      <div className="inventario-header-flex">
        <div className="inventario-busca">
          <input 
            placeholder="Busque por nome ou código" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)} 
          />
          <button className="btn-pesquisar">🔍</button>
        </div>

        <div className="inventario-acoes">
          <button className="btn-adicionar" onClick={abrirFormulario}>➕ Novo Item</button>
        </div>
      </div>

      {modo === "lista" && (
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
            <tbody>
              {itensFiltrados.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modo === "formulario" && (
        <div className="formulario-overlay">
          <div className="formulario-card">
            <h3>Novo Cadastro</h3>
            <input placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
            <input placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} />
            <input placeholder="Quantidade" type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
            <div className="formulario-botoes">
              <button className="salvar" onClick={adicionarItem}>Confirmar</button>
              <button className="cancelar" onClick={() => setModo("lista")}>Voltar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventario