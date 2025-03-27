import React, { useEffect, useState } from "react";
import CadastrarAvisos from "./CadastrarAvisos";
import TabelaAvisos from "./TabelaAvisos";
import { serverAddress } from "../configServer";
import $ from 'jquery'; 

function AvisosIndex({ materia, fecharAvisos }) {
  $(".sucesso").hide();

  const avisoInicial = {
    id: 0,
    aviso: '',
    materia: {}
  };

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [avisos, setAvisos] = useState([]);
  const [objAvisos, setObjAvisos] = useState(avisoInicial);

  useEffect(() => {
    setObjAvisos((prevState) => ({
      ...prevState,
      materia: { id: materia }
    }));
  }, [materia]);

  useEffect(() => {
    fetch(`${serverAddress}/listar-avisos`)
      .then((response) => response.json())
      .then((avisosRetorno) => {
        if (materia) {
          const avisosFiltrados = avisosRetorno.filter((aviso) => aviso.materia?.id === materia);
          setAvisos(avisosFiltrados);
        } else {
          setAvisos([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar avisos:", error);
        setAvisos([]);
      });
  }, [materia]);
  

  const aoDigitar = (e) => {
    setObjAvisos({ ...objAvisos, [e.target.name]: e.target.value });
  };

  const cadastrarAvisos = () => {
    fetch(`${serverAddress}/cadastrar-aviso`, {
      method: 'POST',
      body: JSON.stringify(objAvisos),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((novoAviso) => {
        setAvisos((prevAvisos) => [...prevAvisos, novoAviso]);
        limparFormulario();
        $(".sucesso").html("Aviso cadastrado com sucesso!");
        $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
      });
  };

  const alterarAvisos = () => {
    fetch(`${serverAddress}/editar-avisos`, {
      method: 'PUT',
      body: JSON.stringify(objAvisos),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(() => {
        const avisosAtualizados = avisos.map((aviso) =>
          aviso.id === objAvisos.id ? objAvisos : aviso
        );
        setAvisos(avisosAtualizados);
        limparFormulario();
        $(".sucesso").html("Aviso editado com sucesso!");
        $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
      });
  };

  const removerAvisos = (id) => {
    fetch(`${serverAddress}/remover-avisos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(() => {
        setAvisos((prevAvisos) => prevAvisos.filter((aviso) => aviso.id !== id));
        $(".sucesso").html("Aviso removido com sucesso!");
        $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
      });
  };

  const limparFormulario = () => {
    setObjAvisos(avisoInicial);
    setBtnCadastrar(true);
  };

  const selecionarAviso = (indice) => {
    setObjAvisos(avisos[indice]);
    setBtnCadastrar(false);
  };

  return (
    <div className="popup">
      <div className="botao-popup" onClick={fecharAvisos}>X</div>
      <h1>Avisos</h1>

      <div className="cadastro">
        <CadastrarAvisos
          obj={objAvisos}
          eventoTeclado={aoDigitar}
          cadastrar={cadastrarAvisos}
          alterar={alterarAvisos}
          botao={btnCadastrar}
        />
      </div>
      <TabelaAvisos vetor={avisos} remover={removerAvisos} selecionar={selecionarAviso} />
    </div>
  );
}

export default AvisosIndex;
