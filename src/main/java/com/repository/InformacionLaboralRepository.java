package com.repository;

import com.domain.InformacionLaboral;
import com.domain.Persona;
import com.domain.PersonaIdioma;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InformacionLaboral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionLaboralRepository
extends JpaRepository<InformacionLaboral, Long>, JpaSpecificationExecutor<InformacionLaboral> {

List<InformacionLaboral> findByUsuario(Persona usuario);

@Query(value = "select * from ct_informacon_laboral_tb where usuario_id = :persona",
nativeQuery = true)
List<InformacionLaboral> getByPersona(@Param("persona") Long persona);
}
