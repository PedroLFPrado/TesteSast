package br.com.api.agenda.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.agenda.model.AlunoAtividade;
import br.com.api.agenda.repository.AlunoAtividadeRepository;

@Service
public class AlunoAtividadeService {

     @Autowired
    private AlunoAtividadeRepository alunoAtividadeRepository;

    // Método para marcar a atividade como feita
    public AlunoAtividade marcarAtividadeFeita(Long alunoId, Long atividadeId) {
        Optional<AlunoAtividade> alunoAtividadeOpt = alunoAtividadeRepository.findByAlunoIdAndAtividadeId(alunoId, atividadeId);

        if (alunoAtividadeOpt.isPresent()) {
            AlunoAtividade alunoAtividade = alunoAtividadeOpt.get();
            alunoAtividade.setStatusFeito(true);  // Atualiza o status para 'feita'
            return alunoAtividadeRepository.save(alunoAtividade);  // Salva a mudança no banco
        } else {
            throw new RuntimeException("Atividade não encontrada para o aluno");
        }
    }

    // Método para remover o status 'feita' (caso o aluno queira desfazer a marcação)
    public AlunoAtividade desmarcarAtividadeFeita(Long alunoId, Long atividadeId) {
        Optional<AlunoAtividade> alunoAtividadeOpt = alunoAtividadeRepository.findByAlunoIdAndAtividadeId(alunoId, atividadeId);

        if (alunoAtividadeOpt.isPresent()) {
            AlunoAtividade alunoAtividade = alunoAtividadeOpt.get();
            alunoAtividade.setStatusFeito(false);  // Atualiza o status para 'não feita'
            return alunoAtividadeRepository.save(alunoAtividade);  // Salva a mudança no banco
        } else {
            throw new RuntimeException("Atividade não encontrada para o aluno");
        }
    }

        // Buscar atividades de um aluno
        public List<AlunoAtividade> buscarAtividadesPorAluno(Long alunoId) {
            // Busca todas as atividades associadas ao aluno
            return alunoAtividadeRepository.findByAlunoId(alunoId);
        }

}
