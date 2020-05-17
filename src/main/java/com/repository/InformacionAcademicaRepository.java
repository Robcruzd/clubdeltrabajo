package com.repository;

import com.domain.InformacionAcademica;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InformacionAcademica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionAcademicaRepository extends JpaRepository<InformacionAcademica, Long>, JpaSpecificationExecutor<InformacionAcademica> {
}
