package br.com.api.agenda.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.agenda.model.AlunoAviso;

@Repository
public interface AlunoAvisoRepository extends CrudRepository<AlunoAviso, Long> {

    List<AlunoAviso> findByAlunoId(Long alunoId);
    void deleteByAlunoIdAndAvisoId(Long alunoId, Long avisoId);
    Optional<AlunoAviso> findByAlunoIdAndAvisoId(Long alunoId, Long avisoId);
    
}
