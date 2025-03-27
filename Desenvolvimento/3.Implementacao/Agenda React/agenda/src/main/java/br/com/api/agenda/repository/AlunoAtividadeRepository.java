package br.com.api.agenda.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.agenda.model.AlunoAtividade;

@Repository
public interface AlunoAtividadeRepository extends CrudRepository<AlunoAtividade, Long> {

    Optional<AlunoAtividade> findByAlunoIdAndAtividadeId(Long alunoId, Long atividadeId);
    List<AlunoAtividade> findByAlunoId(Long alunoId);
    
}
