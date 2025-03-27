function TabelaAtividade({ vetor, remover, selecionar, atualizarAtividade, desmarcarAtividade }) {

    const handleCheckboxChange = (id, event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            atualizarAtividade(id, true);
        } else {
            desmarcarAtividade(id, false);
        }
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Título:</th>
                        <th scope="col">Data de entrega:</th>
                        <th scope="col">Descrição:</th>
                        <th scope="col">Matéria:</th>
                        <th scope="col">Feita:</th>
                        <th scope="col">Funções:</th>
                    </tr>
                </thead>
                <tbody>
                    {vetor.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Não há atividades.
                            </td>
                        </tr>
                    ) : (
                        vetor.map((obj, indice) => (
                            <tr key={indice}>
                                <td>{obj.nome}</td>
                                <td>{obj.data_entrega}</td>
                                <td>{obj.descricao}</td>
                                <td>{obj.materia.nome}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={obj.feita}
                                        onChange={(event) => handleCheckboxChange(obj.id, event)}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaAtividade;
