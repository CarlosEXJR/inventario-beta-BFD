import { useState, useEffect } from 'react'; 
import '../csscomponents/login.css';

function Login({ onLogin }) {

  const [verRecuperar, setVerRecuperar] = useState(false);

  // Função para facilitar a troca
  const alternarTema = () => setDark(!dark);

  // --- TELA DE RECUPERAÇÃO ---
  if (verRecuperar) {
    return (
      
      <div className="login">
        {/* Botão de Tema */}
        

        <h2>Recuperar Senha</h2>
        <input type="email" placeholder="E-mail cadastrado" />
        <button className="btn-entrar" style={{ marginTop: '20px' }}>Enviar Link</button>
        
        <h6 onClick={() => setVerRecuperar(false)} style={{ cursor: 'pointer', marginTop: '20px' }}>
          Voltar para o Login
        </h6>
      </div>
    );
  }

  // --- TELA DE LOGIN ---
  return (
    <div className="login">
      

      <h2>Acessar Sistema</h2>
      <input placeholder="Usuário" />
      <input type="password" placeholder="Senha" />

      <h6 onClick={() => setVerRecuperar(true)} style={{ cursor: 'pointer' }}>
        Esqueci minha senha
      </h6>

      <button onClick={onLogin}>Entrar</button>
    </div>
  );
}

export default Login;