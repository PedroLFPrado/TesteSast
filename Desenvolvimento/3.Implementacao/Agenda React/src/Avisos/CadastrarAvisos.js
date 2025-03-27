function CadastrarAvisos({obj, eventoTeclado, cadastrar, alterar, botao}) {

    return(
        <form>
        <input type="text" value={obj.aviso} onChange={eventoTeclado} name="aviso" placeholder="Aviso" className="form-control" />
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

export default CadastrarAvisos;