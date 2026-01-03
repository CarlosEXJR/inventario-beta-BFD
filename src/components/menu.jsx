// Cria um componente funcional chamado Menu
// Ele recebe uma propriedade (prop) chamada mudarTela
function Menu({ mudarTela }) {

  // O return define o que será exibido na tela
  return (

    // Div principal que envolve todo o menu
    // padding: 20 adiciona espaço interno para não ficar colado nas bordas
    <div style={{ padding: 20 }}>

      {/* Título da tela de menu principal */}
      <h2>Menu Principal</h2>

      {/* 
        Botão do menu
        onClick define o que acontece quando o botão é clicado
        A função () => mudarTela("inventario") é uma função anônima
        Ela chama mudarTela passando "inventario" como parâmetro
      */}
      <button onClick={() => mudarTela("inventario")}>

        {/* Texto exibido dentro do botão */}
        Inventário

      </button>

    </div> // Fecha a div principal
  ) // Fecha o return
} // Fecha a função Menu

// Exporta o componente Menu para que ele possa ser usado em outros arquivos
export default Menu
