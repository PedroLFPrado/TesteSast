package br.com.api.agenda.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.api.agenda.model.Aviso;

@Repository
public interface AvisoRepository extends CrudRepository<Aviso, Long>  {
    Page<Aviso> findByMateriaId(Long materiaId, Pageable pageable);
}
