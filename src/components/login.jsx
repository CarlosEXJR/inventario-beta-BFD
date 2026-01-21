import { useState } from 'react'; // 1. Importamos o useState
import '../csscomponents/login.css';

function Login({ onLogin }) {
  // 2. Criamos a "chave" para trocar de tela
  const [verRecuperar, setVerRecuperar] = useState(false);

  // --- TELA DE RECUPERAÇÃO ---
  if (verRecuperar) {
    return (
      <div className="login">
        <h2>Recuperar Senha</h2>
        <input type="email" placeholder="E-mail cadastrado" />
        <br /><br />
        <button className="btn-entrar">Enviar Link</button>
        <br /><br />
        {/* Clicar aqui volta para o Login normal */}
        <h6 onClick={() => setVerRecuperar(false)} style={{ cursor: 'pointer', color: 'blueviolet' }}>
          Voltar para o Login
        </h6>
      </div>
    );
  }

  // --- TELA DE LOGIN (Seu código antigo ajustado) ---
  return (
    <div className="login">
      <h2>Acessar Sistema</h2>

      <input placeholder="Usuário" />
      <br /><br />
      <input type="password" placeholder="Senha" />

      {/* 3. Agora o link funciona e troca para a tela de recuperar */}
      <h6 onClick={() => setVerRecuperar(true)} style={{ cursor: 'pointer' }}>
        Esqueci minha senha
      </h6>

      <br /><br />

      {/* 4. O seu botão de Entrar volta a funcionar aqui */}
      <button onClick={onLogin}>Entrar</button>
    </div>
  );
}

export default Login;