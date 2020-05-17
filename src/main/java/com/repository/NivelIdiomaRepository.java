package com.repository;

import com.domain.NivelIdioma;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NivelIdioma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NivelIdiomaRepository extends JpaRepository<NivelIdioma, Long>, JpaSpecificationExecutor<NivelIdioma> {
}
