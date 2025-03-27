package br.com.api.agenda.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.agenda.model.Materia;


@Repository
public interface MateriaRepository extends CrudRepository<Materia, Long> {

    List<Materia> findByProfessorId(Long professorId);

}
