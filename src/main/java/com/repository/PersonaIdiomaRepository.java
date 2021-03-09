package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.domain.Persona;
import com.domain.PersonaIdioma;

/**
 * Spring Data repository for the PersonaIdioma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaIdiomaRepository
		extends JpaRepository<PersonaIdioma, Long>, JpaSpecificationExecutor<PersonaIdioma> {

	List<PersonaIdioma> findByIdPersona(Persona idPersona);
	
	@Query(value = "select * from ct_persona_idioma_tb where id_persona_id = :persona",
			nativeQuery = true)
	List<PersonaIdioma> getByPersonaIdioma(@Param("persona") Long persona);
	

	void deleteByIdPersona(Persona idPersona);

}
