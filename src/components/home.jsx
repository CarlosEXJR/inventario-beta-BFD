import '../csscomponents/home.css'
import imgImportar from '../assets/img/botao-importar.png'
import imgInventario from '../assets/img/botao-inventario.png'
import imgExportar   from '../assets/img/botao-exportar.png'

// Define o componente funcional Home, recebendo a função 'mudarTela' como propriedade (prop)
function Home({ mudarTela }) {
    return (
        // Container principal da tela inicial, utilizado para centralização absoluta no CSS
        <div className="btshome"> 
            {/* Título principal da página de boas-vindas */}
            <h1>Escolha uma ação para iniciar</h1>
            
            {/* Container flexível que organiza os três botões (cards) lado a lado ou em coluna */}
            <div className="buttons-container">
    
    {/* 1. CARD DE INVENTÁRIO */}
    <button onClick={() => mudarTela("inventario")}>
        <div className="card-header">
            <img src={imgInventario} alt="Inventário" className="card-icon" />
        </div>
        <div className="card-body">
            <h2>Inventário</h2>
            <p className="subtitle">Produtos em estoque</p>
            <p>
                Visualize e gerencie todos os itens armazenados. Acompanhe quantidades, 
                status e detalhes de cada produto em tempo real.
            </p>
        </div>
    </button>

    {/* 2. CARD DE IMPORTAÇÃO */}
    <button onClick={() => mudarTela("importar")}>
        <div className="card-header">
            <img src={imgImportar} alt="Importar" className="card-icon" />
        </div>
        <div className="card-body">
            <h2>Importar XLS</h2>
            <p className="subtitle">Upload de planilhas</p>
            <p>
                Adicione novos produtos ou atualize seu estoque em massa enviando 
                arquivos XLS de forma rápida e segura.
            </p>
        </div>
    </button>

    {/* 3. CARD DE EXPORTAÇÃO */}
    <button onClick={() => mudarTela("exportar")}>
        <div className="card-header">
            <img src={imgExportar} alt="Exportar" className="card-icon" />
        </div>
        <div className="card-body">
            <h2>Exportar XLS</h2>
            <p className="subtitle">Relatórios de estoque</p>
            <p>
                Gere planilhas detalhadas para auditoria ou controle externo, 
                baixando os dados atuais do seu estoque com um clique.
            </p>
        </div>
    </button>

</div>
        </div>
    )
}

// Exporta o componente para ser renderizado como a tela principal após o login
export default Home
