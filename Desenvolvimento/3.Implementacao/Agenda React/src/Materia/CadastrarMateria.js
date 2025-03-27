import React from "react";

function CadastrarMateria({ obj, eventoTeclado, cadastrar, alterar, botao, limparForm }) {
    return (
        <form>
            <input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Matéria" className="form-control" />
            <input type="text" value={obj.sala} onChange={eventoTeclado} name="sala" placeholder="Sala" className="form-control" />
            <input type="text" value={obj.dia_horario} onChange={eventoTeclado} name="dia_horario" placeholder="Dia e Horário" className="form-control" />
            {
                botao
                    ?
                    <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary" />
                    :
                    <div className="botoes-editarM">
                        <input type="button" value="Alterar" onClick={alterar} className="btn btn-warning" />
                        <input type="button" value="Cancelar" onClick={limparForm} className="btn btn-danger" />
                    </div>
            }
        </form>
    );

}

export default CadastrarMateria;