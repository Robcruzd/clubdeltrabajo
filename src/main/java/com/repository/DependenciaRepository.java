package com.repository;

import com.domain.Dependencia;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Dependencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DependenciaRepository extends JpaRepository<Dependencia, Long>, JpaSpecificationExecutor<Dependencia> {
}
