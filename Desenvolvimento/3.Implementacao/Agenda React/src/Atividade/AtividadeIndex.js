import React from "react";
import { useEffect, useState } from 'react';
import TabelaAtividadeProf from './TabelaAtividadeProf'
import CadastroAtividade from './CadastrarAtividade';
import { serverAddress } from "../configServer";
import $ from 'jquery'; 

function AtividadeIndex({ materia, fecharAtividades }) {
  $(".sucesso").hide();

  const atividade = {
    id: 0,
    nome: '',
    data_entrega: '',
    descricao: '',
    materia: {},
    professor: '',
    feita: false,
  };

  const [btnCadastrar, SetBtnCadastrar] = useState(true);
  const [atividades, setAtividades] = useState([]);
  const [objAtividade, setObjAtividade] = useState(atividade);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (materia) {
      setObjAtividade((prevState) => ({
        ...prevState,
        materia: { id: materia },
      }));

      setPage(0);

      fetch(`${serverAddress}/listar-atividade/materia/${materia}?page=0&size=${size}`)
        .then((response) => response.json())
        .then((data) => {
          setAtividades(data.content);
          setTotalPages(data.totalPages);
        });
    }
  }, [materia, size]);

  useEffect(() => {
    if (materia) {
      fetch(`${serverAddress}/listar-atividade/materia/${materia}?page=${page}&size=${size}`)
        .then((response) => response.json())
        .then((data) => {
          setAtividades(data.content);
          setTotalPages(data.totalPages);
        });
    }
  }, [page, materia, size]);

  const proximaPagina = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const paginaAnterior = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const aoDigitar = (e) => {
    setObjAtividade({ ...objAtividade, [e.target.name]: e.target.value });
  };

  const cadastrarAtividade = () => {
    fetch(`${serverAddress}/cadastrar-atividade`, {
      method: 'post',
      body: JSON.stringify(objAtividade),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((atividadesRetorno) => atividadesRetorno.json())
      .then((atividadesRetorno_convertido) => {
        setAtividades([...atividades, atividadesRetorno_convertido]);
        limparFormulario();
        $(".sucesso").html("Atividade cadastrada com sucesso!");
        $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
      });
  };

  const alterarAtividade = () => {
    fetch(`${serverAddress}/editar-atividade`, {
      method: 'put',
      body: JSON.stringify(objAtividade),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((atividadesRetorno) => atividadesRetorno.json())
      .then(() => {
        const vetorTemp = [...atividades];
        const indice = vetorTemp.findIndex((p) => p.id === objAtividade.id);
        vetorTemp[indice] = objAtividade;
        setAtividades(vetorTemp);
        limparFormulario();
        $(".sucesso").html("Atividade editada com sucesso!");
        $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
      });
  };

  const removerAtividade = (id) => {
    fetch(`${serverAddress}/remover-atividade/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(() => {
        const vetorTemp = [...atividades];
        const indice = vetorTemp.findIndex((p) => p.id === id);
        vetorTemp.splice(indice, 1);
        setAtividades(vetorTemp);
        limparFormulario();
        $(".sucesso").html("Atividade removida com sucesso!");
        $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
      });
  };

  const limparFormulario = () => {
    setObjAtividade({
      ...atividade,
      materia: { id: materia },
    });
    SetBtnCadastrar(true);
  };

  const selecionarAtividade = (indice) => {
    setObjAtividade(atividades[indice]);
    SetBtnCadastrar(false);
  };

  return (
    <div className="popup">
      <div className="botao-popup" onClick={fecharAtividades}>X</div>
      <h1>Atividades</h1>

      <div className="cadastro">
        <CadastroAtividade
          obj={objAtividade}
          eventoTeclado={aoDigitar}
          cadastrar={cadastrarAtividade}
          alterar={alterarAtividade}
          botao={btnCadastrar}
        />
      </div>

      <TabelaAtividadeProf
        vetor={atividades}
        remover={removerAtividade}
        selecionar={selecionarAtividade}
      />

      <div className="pagination">
        <button onClick={paginaAnterior} disabled={page === 0}>Anterior</button>
        <span>Página {page + 1} de {totalPages}</span>  
        <button onClick={proximaPagina} disabled={page >= totalPages - 1}>Próxima</button>
      </div>
    </div>
  );
}

export default AtividadeIndex;