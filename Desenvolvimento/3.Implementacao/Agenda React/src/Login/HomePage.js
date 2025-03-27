import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabelaAtividade from '../Atividade/TabelaAtividade';
import Navbar from './navbar.jsx';
import { serverAddress } from "../configServer";
import $ from 'jquery'; 

function HomePage({ user, onLogout }) {
    $(".sucesso").hide();

    const navigate = useNavigate();
    const [filter, setFilter] = useState('todas');
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [atividades, setAtividades] = useState([]);
    const [objAtividade, setObjAtividade] = useState({
        id: 0,
        nome: '',
        data_entrega: '',
        descricao: '',
        materia: {},
        professor: '',
        feita: false
    });
    const [btnCadastrar, SetBtnCadastrar] = useState(true);
    const toggleUserMenu = () => {
        setUserMenuOpen(!isUserMenuOpen);
    };

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const atividadesResponse = await fetch(serverAddress + "/listar-atividade");
                const atividadesData = await atividadesResponse.json();
                const alunoId = user.id;
                const statusResponse = await fetch(serverAddress + `/alunos/${alunoId}/atividades`);
                const statusData = await statusResponse.json();

                console.log("statusData")
                console.log(statusData)

                const atividadesComStatus = atividadesData.filter(atividade => {
                    const statusAtividade = statusData.find(status => status.atividade.id === atividade.id);
                    return statusAtividade;
                }).map(atividade => {
                    const statusAtividade = statusData.find(status => status.atividade.id === atividade.id);
                    return {
                        ...atividade,
                        feita: statusAtividade ? statusAtividade.statusFeito : false
                    };
                });

                setAtividades(atividadesComStatus);

                console.log("atividadesComStatus")
                console.log(atividadesComStatus)
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
            }
        };

        fetchAtividades();
    }, [user.id]);

    const removerAtividade = (id) => {
        fetch(serverAddress + `/alunos/${user.id}/atividades/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    setAtividades(prevAtividades => prevAtividades.filter(atividade => atividade.id !== id));
                    $(".sucesso").html("Atividade removida com sucesso!");
                    $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
                }
            })
            .catch(error => {
                console.error('Erro ao remover atividade:', error);
                $(".sucesso").html("Erro ao remover atividade!");
                $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
            });
    };

    const selecionarAtividade = (indice) => {
        setObjAtividade(atividades[indice]);
        SetBtnCadastrar(false);
        console.log(atividades);
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const filtrarAtividades = () => {
        return atividades.filter(atividade => {
            if (filter === 'feitas') {
                return atividade.feita;
            } else if (filter === 'pendentes') {
                return !atividade.feita;
            } else {
                return true;
            }
        });
    };

    const atualizarAtividade = async (id, statusFeito) => {
        try {
            const response = await fetch(serverAddress + `/${user.id}/atividades/${id}/marcarFeita`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ statusFeito })
            });

            if (response.ok) {
                $(".sucesso").html("Atividade atualizada com sucesso!");
                $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
                setAtividades(prevAtividades => prevAtividades.map(atividade => {
                    if (atividade.id === id) {
                        return { ...atividade, feita: statusFeito };
                    }
                    return atividade;
                }));
            }
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
            $(".sucesso").html("Erro ao atualizar atividade!");
            $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
        }
    };

    const desmarcarAtividade = async (id, statusFeito) => {
        try {
            const response = await fetch(serverAddress + `/${user.id}/atividades/${id}/desmarcarFeita`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ statusFeito })
            });

            if (response.ok) {
                $(".sucesso").html("Atividade atualizada com sucesso!");
                $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
                setAtividades(prevAtividades => prevAtividades.map(atividade => {
                    if (atividade.id === id) {
                        return { ...atividade, feita: statusFeito };
                    }
                    return atividade;
                }));
            }
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
            $(".sucesso").html("Erro ao atualizar atividade!");
            $(".sucesso").delay(10).fadeIn().delay(2000).fadeOut();
        }
    };

    const goToAvisos = () => {
        navigate('/avisos');
    };

    return (
        <div className='App'>
            <div className="sucesso"></div>
            <div className="home-page">
                <Navbar
                    user={user.firstname}
                    toggle={toggleUserMenu}
                    iumo={isUserMenuOpen}
                    handle={handleLogout}
                    avisos= {goToAvisos}
                />

                <h1>Atividades</h1>

                <div className="filtro-atividades">
                    <label> Todas &nbsp;
                        <input
                            type="radio"
                            value="todas"
                            checked={filter === 'todas'}
                            onChange={() => setFilter('todas')}
                        />
                    </label>
                    <label>Pendentes &nbsp;
                        <input
                            type="radio"
                            value="pendentes"
                            checked={filter === 'pendentes'}
                            onChange={() => setFilter('pendentes')}
                        />
                    </label>
                    <label> Feitas &nbsp;
                        <input
                            type="radio"
                            value="feitas"
                            checked={filter === 'feitas'}
                            onChange={() => setFilter('feitas')}
                        />
                    </label>
                </div>

                <TabelaAtividade
                    vetor={filtrarAtividades()}
                    remover={removerAtividade}
                    selecionar={selecionarAtividade}
                    atualizarAtividade={atualizarAtividade}
                    desmarcarAtividade={desmarcarAtividade}
                />
            </div>
        </div>
    );
}

export default HomePage;
