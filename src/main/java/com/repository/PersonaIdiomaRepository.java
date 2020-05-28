package com.repository;

import com.domain.PersonaIdioma;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PersonaIdioma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaIdiomaRepository extends JpaRepository<PersonaIdioma, Long>, JpaSpecificationExecutor<PersonaIdioma> {
}
