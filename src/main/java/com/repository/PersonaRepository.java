package com.repository;

import com.domain.Persona;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long>, JpaSpecificationExecutor<Persona> {

    @Query(value = "update ct_persona_tb \r\n" + 
        "set fecha_recordatorio = null \r\n" + 
        "where fecha_recordatorio <= now() \r\n" +
        "RETURNING id",
        nativeQuery = true)
	List<Long> updateFechaRem();

    @Query(value = "\r\n" + 
			"select * from ct_persona_tb cpt right join ct_informacion_personal_tb cipt on cpt.id = cipt.usuario_id where cipt.profesion_id = :profesion", 
			nativeQuery = true)
    Optional<List<Persona>> findPersonasByProfesion(@Param("profesion") Long profesion);
}
