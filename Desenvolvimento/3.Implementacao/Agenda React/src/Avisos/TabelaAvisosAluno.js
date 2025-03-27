import React, { useEffect, useState } from "react";
import { FaUser, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { serverAddress } from "../configServer";
import $ from 'jquery'; 

function TabelaAvisosAluno({ user}) {
    $(".sucesso").hide();

    const [avisos, setAvisos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvisos = async () => {
            try {
                const avisosResponse = await fetch(serverAddress + "/listar-avisos");
                const avisosData = await avisosResponse.json();
                const alunoId = user.id;
                const avisosAlunoResponse = await fetch(serverAddress + `/alunos/${alunoId}/avisos`);
                const avisosAlunoData = await avisosAlunoResponse.json();

                const avisosFiltrados = avisosData.filter(aviso => {
                    const avisoAluno = avisosAlunoData.find(vinculo => vinculo.aviso.id === aviso.id);
                    return avisoAluno;
                }).map(aviso => ({
                    ...aviso,
                }));

                setAvisos(avisosFiltrados);
            } catch (error) {
                console.error('Erro ao buscar avisos:', error);
            }
        };

        fetchAvisos();
    }, [user]);

    const deletarAviso = async (avisoId) => {
        try {
            await fetch(serverAddress + `/aluno/${user.id}/aviso/${avisoId}`, {
                method: 'DELETE',
            });

            setAvisos(prevAvisos => prevAvisos.filter(aviso => aviso.id !== avisoId));
            $(".sucesso").html("Aviso removido com sucesso!");
            $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
        } catch (error) {
            console.error('Erro ao deletar aviso:', error);
            $(".sucesso").html("Erro ao deletar aviso!");
            $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
        }
    };

    const voltarParaHome = () => {
        navigate('/homeAluno');
    };

    return (
        <div className="home-page">
            <div className="sucesso"></div>
            <nav className="navbar">
                <div className="nav-icons" onClick={voltarParaHome}>
                    <FaArrowLeft className="back-arrow" style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <FaUser className="user-icon" />
                </div>
            </nav>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Aviso:</th>
                        <th scope="col">Matéria:</th>
                        <th scope="col">Funções:</th>
                    </tr>
                </thead>
                <tbody>
                    {avisos.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">
                                Não há avisos.
                            </td>
                        </tr>
                    ) : (
                        avisos.map((obj, indice) => (
                            <tr key={indice}>
                                <td>{obj.aviso}</td>
                                <td>{obj.materia.nome}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deletarAviso(obj.id)}>Remover</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaAvisosAluno;
