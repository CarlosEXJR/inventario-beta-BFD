import { useState } from 'react'; 
import '../csscomponents/login.css';

/**
 * COMPONENTE LOGIN
 * Responsável por capturar credenciais, validar o acesso e gerenciar
 * a alternância para a tela de recuperação de senha.
 */
function Login({ onLogin }) {
  // Estado que define se mostramos o formulário de Login (false) ou Recuperação (true)
  const [verRecuperar, setVerRecuperar] = useState(false);
  
  // Estados que armazenam em tempo real o que é digitado nos campos de acesso
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estado que armazena o e-mail na tela de recuperação
  const [email, setEmail] = useState("");

  /**
   * LÓGICA DE ENTRADA
   * Verifica se as credenciais conferem com o padrão '123'.
   * Se correto, chama a função 'onLogin' vinda do App.jsx.
   */
  const handleEntrar = () => {
    if (usuario === "123" && senha === "123") {
      onLogin(); // Libera o acesso ao sistema
    } else {
      // Feedback amigável para erro de digitação
      alert("Usuário ou senha incorretos!\nDica: Use '123' para ambos.");
    }
  };

  /**
   * LÓGICA DE RECUPERAÇÃO
   * Realiza uma validação básica de formato de e-mail (presença do @).
   */
  const handleRecuperar = () => {
    if (!email.includes("@")) {
      alert("Por favor, insira um e-mail válido (deve conter @).");
    } else {
      alert(`Link de recuperação enviado para: ${email}`);
      setVerRecuperar(false); // Retorna o usuário para a tela de login
    }
  };

  /**
   * INTERFACE DE RECUPERAÇÃO DE SENHA
   */
  if (verRecuperar) {
    return (
      <div className="login">
        <h2>Recuperar Senha</h2>
        <p style={{ fontSize: '12px', color: 'var(--texto-secundario)', marginBottom: '15px' }}>
          Insira seu e-mail para receber as instruções.
        </p>
        
        <input 
          type="email" 
          placeholder="E-mail cadastrado" 
          value={email}
          // Sincroniza o que é digitado com o estado 'email'
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button 
          className="btn-entrar" 
          style={{ marginTop: '20px' }}
          onClick={handleRecuperar}
        >
          Enviar Link
        </button>
        
        <h6 
          onClick={() => setVerRecuperar(false)} 
          style={{ cursor: 'pointer', marginTop: '20px', color: 'var(--azul-destaque)' }}
        >
          Voltar para o Login
        </h6>
      </div>
    );
  }

  /**
   * INTERFACE PRINCIPAL DE LOGIN
   */
  return (
    <div className="login">
      <h2>Acessar Sistema</h2>
      
      <div className="form-grupo">
        <input 
          type="text" 
          placeholder="Usuário" 
          value={usuario}
          // Atualiza o estado 'usuario' a cada tecla pressionada
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha}
          // Atualiza o estado 'senha' a cada tecla pressionada
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <h6 
        onClick={() => setVerRecuperar(true)} 
        style={{ cursor: 'pointer', margin: '10px 0' }}
      >
        Esqueci minha senha
      </h6>

      {/* Dispara a função de validação ao clicar */}
      <button onClick={handleEntrar}>Entrar</button>
    </div>
  );
}

export default Login;