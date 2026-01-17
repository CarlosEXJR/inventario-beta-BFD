import { useState } from "react"

function Inventario() {
  // Controla se a tela mostra a tabela ou o formulário
  const [modo, setModo] = useState("lista")

  // Passo 1: Criar a lista de locais predefinidos
const locaisPredefinidos = [
  "Almoxarifado A",
  "Almoxarifado B",
  "Almoxarifado C",
  "Sala de Servidores",
  "Recepção"
];


  // Estado que guarda os itens do inventário (simula o banco)
  const [itens, setItens] = useState([
  {
    "id": 1,
    "codigo": "A001",
    "nome": "Teclado Mecânico",
    "categoria": "Periféricos",
    "quantidade": 10,
    "localizacao": "Almoxarifado A",
    "atualizado_em": "2025-01-10 14:30"
  },
  {
    "id": 2,
    "codigo": "M015",
    "nome": "Monitor LED 24\"",
    "categoria": "Monitores",
    "quantidade": 5,
    "localizacao": "Almoxarifado B",
    "atualizado_em": "2025-01-12 09:15"
  },
  {
    "id": 3,
    "codigo": "C203",
    "nome": "CPU Dell i5",
    "categoria": "Computadores",
    "quantidade": 3,
    "localizacao": "Sala de Servidores",
    "atualizado_em": "2025-01-09 16:45"
  },
  {
    "id": 4,
    "codigo": "R042",
    "nome": "Roteador Wi-Fi",
    "categoria": "Redes",
    "quantidade": 8,
    "localizacao": "Almoxarifado C",
    "atualizado_em": "2025-01-11 11:20"
  },
  {
    "id": 5,
    "codigo": "I789",
    "nome": "Impressora Multifuncional",
    "categoria": "Impressão",
    "quantidade": 2,
    "localizacao": "Almoxarifado A",
    "atualizado_em": "2025-01-08 13:10"
  }
]
  )

  // Estados para os campos do formulário
  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [localizacao, setLocalizacao] = useState("")

  // Coloque isso acima da sua função adicionarItem
function abrirFormulario() {
  // 1. Calculamos o próximo número baseado no tamanho da lista
  const proximoNumero = itens.length + 1;
  
  // 2. Criamos o texto do código (ex: COD-6)
  const novoCodigo = "A" + proximoNumero.toString().padStart(3, "0"); 
  
  // 3. Guardamos no estado 'codigo' que você já tem
  setCodigo(novoCodigo);
  
  // 4. Mudamos a tela para o formulário
  setModo("formulario");
}

  // Função para adicionar um novo item
  function adicionarItem() {

    const novoItem = {
      id: itens.length + 1, // simula AUTO_INCREMENT
      codigo: codigo,
      nome: nome,
      categoria: categoria,
      quantidade: Number(quantidade),
      localizacao: localizacao,
      atualizado_em: new Date().toLocaleString()
    }

    // Atualiza o estado adicionando o novo item
    setItens([...itens, novoItem])

    // Limpa os campos do formulário
    setCodigo("")
    setNome("")
    setCategoria("")
    setQuantidade("")
    setLocalizacao("")
    setModo("lista")
  }

  return (
    <div>
        <button onClick={abrirFormulario}>
          ➕ Adicionar Item
        </button>
      {/* TABELA */}

      {modo === "lista" && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Localização</th>
              <th>Atualizado em</th>
            </tr>
          </thead>

          <tbody>
            {itens.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.codigo}</td>
                <td>{item.nome}</td>
                <td>{item.categoria}</td>
                <td>{item.quantidade}</td>
                <td>{item.localizacao}</td>
                <td>{item.atualizado_em}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modo === "formulario" && (
      <>
        <h3>Adicionar Item</h3>

        <input
          placeholder="Código"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
        />
        <br />
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <br />
        <input
          placeholder="Categoria"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        />
        <br />
        <input
          placeholder="Quantidade"
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
        />
        <br />
        {/* Passo 3: Substituir o input pelo select */}
      
      <select 
        value={localizacao} 
        onChange={e => setLocalizacao(e.target.value)}
      >
        {locaisPredefinidos.map((local, index) => (
          <option key={index} value={local}>
            {local}
          </option>
        ))}
      </select>

        <button onClick={adicionarItem}>Salvar</button>
        <button onClick={() => setModo("lista")}>Cancelar</button>
      </>
      )}
    </div>
  )
}

export default Inventario
