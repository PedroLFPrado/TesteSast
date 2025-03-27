package br.com.api.agenda.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.agenda.model.AlunoAviso;
import br.com.api.agenda.model.Aviso;
import br.com.api.agenda.model.Usuario;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.repository.AlunoAvisoRepository;
import br.com.api.agenda.repository.AvisoRepository;
import br.com.api.agenda.repository.UsuarioRepository;

@Service
public class AvisoService {

    @Autowired
    private AvisoRepository avisoRepository;

    @Autowired
    private RespostaModelo respostaModelo;

    @Autowired
    private UsuarioRepository alunoRepository;

    @Autowired
    private AlunoAvisoRepository alunoAvisoRepository;


     public ResponseEntity<?> CadastrarAlterarAviso(Aviso avisoModel, String acao){
        if(acao.equals("cadastrar")){

            Aviso novoAviso = avisoRepository.save(avisoModel);

           List<Usuario> alunos = alunoRepository.findAll();

            for (Usuario aluno : alunos) {
                AlunoAviso alunoaviso = new AlunoAviso();
                alunoaviso.setAluno(aluno);
                alunoaviso.setAviso(novoAviso);
                alunoAvisoRepository.save(alunoaviso); 
            }

            return new ResponseEntity<Aviso>(novoAviso, HttpStatus.CREATED);

        } else {
            return new ResponseEntity<Aviso>(avisoRepository.save(avisoModel), HttpStatus.OK);
        }
    }


    public Iterable<Aviso> listar(){
    return avisoRepository.findAll();
    }

    // Remover
     public ResponseEntity<RespostaModelo> remover(long id){
       
        avisoRepository.deleteById(id);
    
        respostaModelo.setMensagem("Aviso removido com sucesso");
        return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.OK);
    }
    

}
