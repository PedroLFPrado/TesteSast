import '../estilos/atividade_materia.css'

function TabelaMateria({vetor, remover, selecionarAtividade, selecionarAvisos}){
    return(

        <table class="table table-hover table-responsive w-auto table-striped">
        <thead>
            <tr>
                <th scope="col">Matéria:</th>
                <th scope="col">Sala:</th>
                <th scope="col">Dia e Horário:</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {
                vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td>{obj.nome}</td>
                        <td>{obj.sala}</td>
                        <td>{obj.dia_horario}</td>
                        <td> <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>  </td>
                        <td> <button className="btn btn-warning" onClick={() => {selecionarAtividade(indice)}}>Editar</button>  </td>
                        <td> <button className="btn btn-success" onClick={() => {selecionarAtividade(indice)}}>Atividades</button>  </td>
                        <td> <button className="btn btn-success" onClick={() => {selecionarAvisos(indice)}}>Avisos</button>  </td>
                    </tr>
                ))

            }
        </tbody>
    </table>

    )

}

export default TabelaMateria;