package com.repository;

import com.domain.AplicacionOferta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AplicacionOferta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AplicacionOfertaRepository extends JpaRepository<AplicacionOferta, Long>, JpaSpecificationExecutor<AplicacionOferta> {
}
