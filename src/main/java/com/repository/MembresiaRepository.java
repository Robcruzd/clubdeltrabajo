package com.repository;

import com.domain.Membresia;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Membresia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MembresiaRepository extends JpaRepository<Membresia, Long>, JpaSpecificationExecutor<Membresia> {
}