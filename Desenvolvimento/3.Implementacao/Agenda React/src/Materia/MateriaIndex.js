import React from "react";
import { useEffect, useState } from 'react';
import CadastrarMateria from "./CadastrarMateria";
import TabelaMateria from "./TabelaMateria";
import AtividadeIndex from "../Atividade/AtividadeIndex";
import AvisosIndex from "../Avisos/AvisosIndex";
import { serverAddress } from "../configServer";
import $ from 'jquery'; 

function MateriaIndex(user) {
    $(".sucesso").hide();

    const materia = {
        id: 0,
        nome: '',
        sala: '',
        dia_horario: '',
        atividades: [],
        professor: user.user
    }
    const [btnCadastrar, SetBtnCadastrar] = useState(true);
    const [materiaSelecionadaAtividade, SetMateriaSelecionadaAtividade] = useState(false);
    const [materiaSelecionadaAvisos, SetMateriaSelecionadaAvisos] = useState(false);
    const [materias, setMaterias] = useState([]);
    const [objMateria, setObjMateria] = useState(materia);
    const [materiaId, setMateriaId] = useState(null);

    useEffect(() => {
        fetch(serverAddress + `/listar-materias?userId=${user.user.id}`)
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => setMaterias(materiasRetorno_convertido));

        console.log(user.user.id)
    }, []);

    const aoDigitar = (e) => {
        setObjMateria({ ...objMateria, [e.target.name]: e.target.value, professor_id: { id: user.user.id } });
    }

    const cadastrarMateria = () => {
        fetch(serverAddress + '/cadastrar-materia', {
            method: 'post',
            body: JSON.stringify(objMateria),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => {
                setMaterias([...materias, materiasRetorno_convertido]);
                console.log(user.user.id)
                limparFormulario(); 
                $(".sucesso").html("Matéria cadastrada com sucesso!");
                $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
            }
            )
    }

    const alterarMateria = () => {
        fetch(serverAddress + '/editar-materia', {
            method: 'put',
            body: JSON.stringify(objMateria),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => {
                let vetorTemp = [...materias];
                let indice = vetorTemp.findIndex((p) => {
                    return p.id === objMateria.id;
                });
                vetorTemp[indice] = objMateria;

                setMaterias(vetorTemp);
                limparFormulario();
                $(".sucesso").html("Matéria editada com sucesso!");
                $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
            })
    }

    const removerMateria = (id) => {
        fetch(serverAddress + '/remover-materia/' + id, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => {
                let vetorTemp = [...materias];
                let indice = vetorTemp.findIndex((p) => {
                    return p.id === id;
                });
                vetorTemp.splice(indice, 1);

                setMaterias(vetorTemp);
                limparFormulario();
                $(".sucesso").html("Matéria removida com sucesso!");
                $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
            })
    }

    const limparFormulario = () => {
        setObjMateria(materia);
        SetBtnCadastrar(true);
        SetMateriaSelecionadaAtividade(false);
        SetMateriaSelecionadaAvisos(false);
    }

    useEffect(() => {
        if (materiaId !== null) {
            console.log("ID da Matéria Selecionada:", materiaId);
        }
    }, [materiaId]);

    const selecionarMateriaEditar = (indice) => {
        limparFormulario();
        setObjMateria(materias[indice]);
        SetBtnCadastrar(false);
        console.log("Matéria Selecionada:", materias[indice]);
        setMateriaId(materias[indice].id);
    }

    const selecionarMateriaAtividade = (indice) => {
        if (materiaSelecionadaAtividade && materiaId === materias[indice].id) {
            SetMateriaSelecionadaAtividade(false);
        } else {
            limparFormulario();
            SetMateriaSelecionadaAtividade(true);
            console.log("Matéria Selecionada:", materias[indice]);
            setMateriaId(materias[indice].id);
        }
    };

    const selecionarMateriaAvisos = (indice) => {
        if (materiaSelecionadaAvisos && materiaId === materias[indice].id) {
            SetMateriaSelecionadaAvisos(false);
        } else {
            limparFormulario();
            SetMateriaSelecionadaAvisos(true);
            console.log("Matéria Selecionada:", materias[indice]);
            setMateriaId(materias[indice].id);
        }
    }

    return (
        <div className="atividade">
            <div className="sucesso"></div>
            <h1>Cadastrar Matéria</h1>

            <div className="cadastro">
                <CadastrarMateria
                    obj={objMateria}
                    eventoTeclado={aoDigitar}
                    cadastrar={cadastrarMateria}
                    alterar={alterarMateria}
                    botao={btnCadastrar}
                    limparForm={limparFormulario}
                />
            </div>

            <div className="tabela-materias">
                <TabelaMateria
                    vetor={materias}
                    remover={removerMateria}
                    selecionarEditar={selecionarMateriaEditar}
                    selecionarAtividade={selecionarMateriaAtividade}
                    selecionarAvisos={selecionarMateriaAvisos}
                />
            </div>

            <div className="atividades-index">
                {materiaSelecionadaAtividade ? (
                    <AtividadeIndex
                        materia={materiaId}
                        fecharAtividades={() => SetMateriaSelecionadaAtividade(false)}
                    />
                ) : (
                    <div></div>
                )}
            </div>

            <div className="avisos-index">
                {materiaSelecionadaAvisos ? (
                    <AvisosIndex
                        materia={materiaId}
                        fecharAvisos={() => SetMateriaSelecionadaAvisos(false)}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default MateriaIndex;