package com.repository;

import com.domain.Profesion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Profesion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfesionRepository extends JpaRepository<Profesion, Long>, JpaSpecificationExecutor<Profesion> {
}
