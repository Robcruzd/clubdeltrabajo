package com.repository;

import com.domain.Archivo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Archivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArchivoRepository extends JpaRepository<Archivo, Long>, JpaSpecificationExecutor<Archivo> {
}
