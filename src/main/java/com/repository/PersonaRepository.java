package com.repository;

import com.domain.Persona;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;

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
}
