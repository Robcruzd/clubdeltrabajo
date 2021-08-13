package com.repository;

import com.domain.Pagos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pagos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagosRepository extends JpaRepository<Pagos, Long>, JpaSpecificationExecutor<Pagos> {
}