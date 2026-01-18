import '../csscomponents/home.css'

function Home({ mudarTela }) {
    return (
        <div className="btshome"> 
            <h1>Escolha uma ação para iniciar</h1>
            
            <div className="buttons-container">
                {/* Botão Inventário */}
                <button onClick={() => mudarTela("inventario")}>
                    <h2>Inventário</h2>
                    <p className="subtitle">Produtos em estoque</p>
                    <p>Visualize, pesquise e edite a lista completa de produtos em estoque. 
                       Acompanhe a quantidade e o status de cada item em tempo real.</p>
                    <hr className="divider" />
                </button>

                {/* Botão Importar */}
                <button onClick={() => mudarTela("importar")}>
                    <h2>Importar XLS</h2>
                    <p className="subtitle">Upload de planilhas</p>
                    <p>Realize o upload de planilhas (XLS) para adicionar novos produtos ou 
                       atualizar grandes volumes de dados de estoque de uma só vez.</p>
                    <hr className="divider" />
                </button>

                {/* Botão Exportar */}
                <button onClick={() => mudarTela("exportar")}>
                    <h2>Exportar XLS</h2>
                    <p className="subtitle">Relatórios de estoque</p>
                    <p>Gere e baixe relatórios de estoque personalizados (inventário, entradas, 
                       saídas e movimentações) para análise e auditoria externa.</p>
                    <hr className="divider" />
                </button>
            </div>
        </div>
    )
}

export default Home