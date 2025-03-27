package br.com.api.agenda.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.api.agenda.model.AlunoAtividade;
import br.com.api.agenda.model.Atividade;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.model.Usuario;
import br.com.api.agenda.repository.AlunoAtividadeRepository;
import br.com.api.agenda.repository.AtividadeRepository;
import br.com.api.agenda.repository.UsuarioRepository;


@Service
public class AtividadeService {

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private UsuarioRepository alunoRepository;

    @Autowired
    private AlunoAtividadeRepository alunoAtividadeRepository;

    @Autowired
    private RespostaModelo respostaModelo;

    public Iterable<Atividade> listar(){
        return atividadeRepository.findAll();
    }

// Listar atividades por matéria com paginação
public Page<Atividade> listarPorMateria(Long materiaId, Pageable pageable) {
    return atividadeRepository.findByMateriaId(materiaId, pageable);
}

    // Cadastrar / Alterar
    public ResponseEntity<?> CadastrarAlterarAtividade(Atividade am, String acao){
        if(acao.equals("cadastrar")){

            Atividade novaAtividade = atividadeRepository.save(am);

            // Busca todos os alunos
           List<Usuario> alunos = alunoRepository.findAll();

            // Para cada aluno, cria uma entrada na tabela AlunoAtividade
            for (Usuario aluno : alunos) {
                AlunoAtividade alunoAtividade = new AlunoAtividade();
                alunoAtividade.setAluno(aluno);
                alunoAtividade.setAtividade(novaAtividade);
                alunoAtividade.setStatusFeito(false); // Status inicial como não feito
                alunoAtividadeRepository.save(alunoAtividade); // Salva a entrada no banco de dados
            }

            return new ResponseEntity<Atividade>(novaAtividade, HttpStatus.CREATED);

        } else {
            return new ResponseEntity<Atividade>(atividadeRepository.save(am), HttpStatus.OK);
        }
    }

    // Remover
    public ResponseEntity<RespostaModelo> remover(long id){

        atividadeRepository.deleteById(id);

        respostaModelo.setMensagem("Atividade removida com sucesso");
        return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.OK);
    }
    
}
