package com.repository;

import com.domain.Institucion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Institucion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstitucionRepository extends JpaRepository<Institucion, Long>, JpaSpecificationExecutor<Institucion> {
}
