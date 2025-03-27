import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TabelaAtividade from './Atividade/TabelaAtividade';
import CadastroAtividade from './Atividade/CadastrarAtividade';
import LoginPage from './Login/LoginPage';
import HomePage from './Login/HomePage';
import RegistrationPage from './Login/RegistrationPage';
import HomeProfessor from './Login/HomeProfessor';
import TabelaAvisosAluno from './Avisos/TabelaAvisosAluno';
import { serverAddress } from "./configServer";

function App() {
  const [user, setUser] = useState('');
  const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser('');
  };
  const atividade = {
    id: 0,
    nome: '',
    data_entrega: '',
    descricao: '',
    materia: '',
    professor: '',
    feita: false
  };
  const aoDigitar = (e) => {
    setObjAtividade({ ...objAtividade, [e.target.name]: e.target.value });
  };
  const [btnCadastrar, SetBtnCadastrar] = useState(true);
  const [atividades, setAtividades] = useState([]);
  const [objAtividade, setObjAtividade] = useState(atividade);

  useEffect(() => {
    fetch(serverAddress + "/listar-atividade")
      .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
      .then(setAtividades)
      .catch(error => console.error('Erro ao buscar atividades:', error));
  }, []);

  const cadastrarAtividade = () => {
    fetch(serverAddress + '/cadastrar-atividade', {
      method: 'POST',
      body: JSON.stringify(objAtividade),
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
      .then(novaAtividade => {
        setAtividades([...atividades, novaAtividade]);
        limparFormulario();
        alert('Atividade cadastrada com sucesso');
      })
      .catch(error => console.error('Erro ao cadastrar atividade:', error));
  };

  const alterarAtividade = () => {
    fetch(serverAddress + '/editar-atividade', {
      method: 'PUT',
      body: JSON.stringify(objAtividade),
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
      .then(() => {
        const index = atividades.findIndex(p => p.id === objAtividade.id);
        const vetorTemp = [...atividades];
        vetorTemp[index] = objAtividade;
        setAtividades(vetorTemp);
        limparFormulario();
      })
      .catch(error => console.error('Erro ao alterar atividade:', error));
  };

  const removerAtividade = (id) => {
    fetch(serverAddress + `/remover-atividade/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
    })
      .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
      .then(({ mensagem }) => {
        setAtividades(atividades.filter(p => p.id !== id));
        limparFormulario();
        alert(mensagem);
      })
      .catch(error => console.error('Erro ao remover atividade:', error));
  };

  const limparFormulario = () => {
    setObjAtividade(atividade);
    SetBtnCadastrar(true);
  };

  const selecionarAtividade = (indice) => {
    setObjAtividade(atividades[indice]);
    SetBtnCadastrar(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={!user ? <LoginPage onLogin={handleLogin} /> : <HomePage user={user} onLogout={handleLogout} />}
        />
        <Route path="/HomeAluno" element={<HomePage user={user} onLogout={handleLogout} />} />
        <Route path="/HomeProf" element={<HomeProfessor user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/avisos" element={<TabelaAvisosAluno user={user} onLogout={handleLogout} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/atividades" element={
          user ? (
            <>
              <CadastroAtividade obj={objAtividade} eventoTeclado={aoDigitar} cadastrar={cadastrarAtividade} alterar={alterarAtividade} botao={btnCadastrar} />
              <TabelaAtividade vetor={atividades} remover={removerAtividade} selecionar={selecionarAtividade} />
            </>
          ) : (<LoginPage onLogin={handleLogin} />)
        } />
      </Routes>
    </div>
  );
}

export default App;
