// Cria um componente funcional chamado Login
// Ele recebe uma propriedade (prop) chamada onLogin
function Login({ onLogin }) {

  // O return define o que será renderizado na tela
  return (
    // Div principal que envolve todo o conteúdo do login
    <div style={{ textAlign: "center", marginTop: 100 }}>
      
      {/* Título da tela de login */}
      <h2>Login</h2>

      {/* Campo de texto para o nome do usuário */}
      <input placeholder="Usuário" />

      {/* Quebras de linha para espaçamento */}
      <br /><br />

      {/* Campo de senha */}
      {/* type="password" oculta os caracteres digitados */}
      <input type="password" placeholder="Senha" />

      {/* Mais espaçamento */}
      <br /><br />

      {/* 
        Botão de login
        onClick chama a função onLogin
        Essa função veio do componente App
      */}
      <button onClick={onLogin}>Entrar</button>

    </div>
  )
}

// Exporta o componente Login para ser usado em outros arquivos
export default Login
