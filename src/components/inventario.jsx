import '../csscomponents/inventario.css'
import { useState, useEffect } from "react"

function Inventario() {
  const [modo, setModo] = useState("lista")
  const [busca, setBusca] = useState("");

  const locaisPredefinidos = [
    "Almoxarifado A",
    "Almoxarifado B",
    "Almoxarifado C",
    "Sala de Servidores",
    "Recepção"
  ]

  const [itens, setItens] = useState(() => {
  // Tenta pegar os dados salvos
  const dadosSalvos = localStorage.getItem("meu_inventario");
  // Se existirem dados, transforma de texto para objeto. Se não, usa a lista vazia ou inicial.
  return dadosSalvos ? JSON.parse(dadosSalvos) : [
    { id: 1, codigo: "A001", nome: "Teclado Mecânico", quantidade: 10 },
    { id: 2, codigo: "M015", nome: "Monitor LED 24\"", quantidade: 5 }
  ];
});

 // Verifique se o useEffect está no import lá no topo!

// ... dentro da função Inventario ...

useEffect(() => {
  // Toda vez que a variável 'itens' mudar, ele salva no navegador
  localStorage.setItem("meu_inventario", JSON.stringify(itens));
}, [itens]);

  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [localizacao, setLocalizacao] = useState("")

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
      categoria,
      quantidade: Number(quantidade),
      localizacao,
      atualizado_em: new Date().toLocaleString()
    }

    setItens([...itens, novoItem])

    setCodigo("")
    setNome("")
    setCategoria("")
    setQuantidade("")
    setLocalizacao("")
    setModo("lista")
  }

  // Criamos uma lista nova baseada no que foi digitado
const itensFiltrados = itens.filter(item => 
  item.nome.toLowerCase().includes(busca.toLowerCase()) || 
  item.codigo.toLowerCase().includes(busca.toLowerCase())
);

  return (
    <div className="inventario-container">

      {/* TOPO */}
      <div className="inventario-busca">
        <input 
          placeholder="Busque por nome ou código" 
          value={busca}
          onChange={(e) => setBusca(e.target.value)} // Atualiza o texto da busca
        />
        <button>🔍 Pesquisar</button>
      </div>
      {/* AÇÕES */}
      <div className="inventario-acoes">
        <button onClick={abrirFormulario}>➕ Adicionar Item</button>
        <button>Editar</button>
        <button>Salvar</button>
      </div>

      {/* TABELA */}
      {modo === "lista" && (
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
      )}

      {/* FORMULÁRIO */}
      {modo === "formulario" && (
        <div className="formulario">
          <h3>Adicionar Item</h3>

          <input
            placeholder="Código"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
          />

          <input
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

       

          <input
            placeholder="Quantidade"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
          />

       

          <div className="formulario-botoes">
            <button className="salvar" onClick={adicionarItem}>Salvar</button>
            <button className="cancelar" onClick={() => setModo("lista")}>Cancelar</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Inventario
