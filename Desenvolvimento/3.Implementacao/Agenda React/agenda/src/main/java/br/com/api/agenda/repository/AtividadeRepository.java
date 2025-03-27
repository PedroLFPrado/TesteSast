package br.com.api.agenda.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.api.agenda.model.Atividade;

@Repository
public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
    Page<Atividade> findByMateriaId(Long materiaId, Pageable pageable);

}
