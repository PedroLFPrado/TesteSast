function CadastroAtividade({obj, eventoTeclado, cadastrar, alterar, botao}){
    return(
        <form>
        <input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome" className="form-control" />
        <input type="text" value={obj.data_entrega} onChange={eventoTeclado} name="data_entrega" placeholder="Data de Entrega" className="form-control"/>
        <input type="text" value={obj.descricao} onChange={eventoTeclado} name="descricao" placeholder="Descrição" className="form-control"/>
        {
            botao
            ?
            <input type="button"  value="Cadastrar" onClick={cadastrar} className="btn btn-primary" />
            :
            <div>
                    <input type="button"  value="Alterar" onClick={alterar} className="btn btn-warning" />
            </div>
        }
    </form>
    )
}

export default CadastroAtividade;