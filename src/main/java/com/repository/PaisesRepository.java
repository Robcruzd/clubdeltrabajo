package com.repository;

import com.domain.Paises;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cargo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaisesRepository extends JpaRepository<Paises, Long>, JpaSpecificationExecutor<Paises> {
}
