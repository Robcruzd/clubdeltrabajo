package com.repository;

import com.domain.Regiones;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cargo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegionesRepository extends JpaRepository<Regiones, Long>, JpaSpecificationExecutor<Regiones> {
}
