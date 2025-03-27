function TabelaAtividade({ vetor, remover, selecionar}) {
        
    return(
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Atividade:</th>
                <th scope="col">Data entrega:</th>
                <th scope="col">Descrição:</th>
                <th scope="col" colSpan={2}>Funções:</th>
            </tr>
        </thead>
        <tbody>
            {
                vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td>{obj.nome}</td>
                        <td>{obj.data_entrega}</td>
                        <td>{obj.descricao}</td>
                        <td> <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>  </td> 
                        <td> <button className="btn btn-warning" onClick={() => {selecionar(indice)}}>Editar</button>  </td>
                    </tr>
                ))

            }
        </tbody>
    </table>
    )
}

export default TabelaAtividade;