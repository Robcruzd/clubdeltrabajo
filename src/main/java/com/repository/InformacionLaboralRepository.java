package com.repository;

import com.domain.InformacionLaboral;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InformacionLaboral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionLaboralRepository extends JpaRepository<InformacionLaboral, Long>, JpaSpecificationExecutor<InformacionLaboral> {
}
