package br.com.api.agenda.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.agenda.model.AlunoAviso;
import br.com.api.agenda.repository.AlunoAvisoRepository;

@Service
public class AlunoAvisoService {

    @Autowired
    AlunoAvisoRepository alunoAvisoRepository;

        // Buscar atividades de um aluno
        public List<AlunoAviso> buscarAvisosPorAluno(Long alunoId) {
            // Busca todas as atividades associadas ao aluno
            return alunoAvisoRepository.findByAlunoId(alunoId);
        }

    // Método para deletar a relação entre aluno e aviso
    public void deletarAvisoAluno(Long alunoId, Long avisoId) {
        // Verifique se a relação existe antes de tentar deletar
        Optional<AlunoAviso> alunoAvisoOpt = alunoAvisoRepository.findByAlunoIdAndAvisoId(alunoId, avisoId);
        
        if (alunoAvisoOpt.isPresent()) {
            alunoAvisoRepository.delete(alunoAvisoOpt.get());
        } else {
            throw new RuntimeException("Relação entre aluno e aviso não encontrada.");
        }
    }
    
}
