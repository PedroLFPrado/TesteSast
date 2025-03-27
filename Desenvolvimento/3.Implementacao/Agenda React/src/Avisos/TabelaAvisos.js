function TabelaAvisos({ vetor, remover, selecionar}) {
    return(
        <table className="table">
        <thead>
            <tr>
                <th scope="col">Aviso:</th>
                <th scope="col" colSpan={2}>Funções:</th>
            </tr>
        </thead>
        <tbody>
            {
                vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td>{obj.aviso}</td>
                        <td> <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>  </td> 
                        <td> <button className="btn btn-warning" onClick={() => {selecionar(indice)}}>Editar</button>  </td>
                    </tr>
                ))

            }
        </tbody>
    </table>
    )
}

export default TabelaAvisos;