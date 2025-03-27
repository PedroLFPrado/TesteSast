import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from './logo.jsx';
import { serverAddress } from "../configServer";
import $ from 'jquery'; 

function LoginPage({ onLogin }) {
  $(".sucesso").hide();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const url = serverAddress + `/get?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await axios.get(url);
      const userData = response.data;
      const url_p = serverAddress + `/getProfessorStatus?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response_p = await axios.get(url_p);
      const isProfessor = response_p.data;

      if (isProfessor) {
        navigate('/HomeProf');  // Se professor for true (1), redireciona para HomeProf
        console.log(userData); // Verifique se o firstname está presente
      } else {
        navigate('/HomeAluno'); // Se professor for false (0), redireciona para HomeAluno
      }
      onLogin(userData);

    } catch (error) {
      console.error('Login error:', error);
      $(".sucesso").html("Login não encontrado!");
      $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
    }
  };

  return (
    <>
    <div className="sucesso"></div>
    <div className='login-container'>
      <div className="login-form">
        <Logo />
        <h2>Entre na sua conta:</h2>
        <div className="input-container">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="login-button" type="button" onClick={handleLogin}>Login</button>
      </div>
      <p className="registration-link">
        Não possui uma conta? Clique <a href="/register">aqui</a> para se registrar
      </p>
    </div>
    </>
  );
}

export default LoginPage;
