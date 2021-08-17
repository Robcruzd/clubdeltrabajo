package com.repository;

import com.domain.Pagos;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data  repository for the Pagos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagosRepository extends JpaRepository<Pagos, Long>, JpaSpecificationExecutor<Pagos> {

    @Query(value = "\r\n" + 
			"select * from ct_pagos_tb where pg_preferenciamerc = :preference", 
			nativeQuery = true)
	Pagos findByPreferenceQuery(@Param("preference") String preference);
}