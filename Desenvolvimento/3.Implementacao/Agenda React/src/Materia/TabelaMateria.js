function TabelaMateria({ vetor, remover, selecionarEditar, selecionarAtividade, selecionarAvisos }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Matéria:</th>
                    <th scope="col">Sala:</th>
                    <th scope="col">Dia e Horário:</th>
                    <th scope="col" colSpan={4}>Funções:</th>
                </tr>
            </thead>
            <tbody>
                {vetor.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center">
                            Não há matérias.
                        </td>
                    </tr>
                ) : (
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{obj.nome}</td>
                            <td>{obj.sala}</td>
                            <td>{obj.dia_horario}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={() => { selecionarEditar(indice) }}>Editar</button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => { selecionarAtividade(indice) }}>Atividades</button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => { selecionarAvisos(indice) }}>Avisos</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export default TabelaMateria;