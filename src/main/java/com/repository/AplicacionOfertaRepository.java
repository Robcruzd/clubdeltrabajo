package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.domain.AplicacionOferta;

/**
 * Spring Data  repository for the AplicacionOferta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AplicacionOfertaRepository extends JpaRepository<AplicacionOferta, Long>, JpaSpecificationExecutor<AplicacionOferta> {

	@Query(value = "select * from ct_aplicacion_oferta_tb where usuario_id = :persona",
	nativeQuery = true)
	List<AplicacionOferta> getByPersona(@Param("persona") Long persona);
	
	@Query(value = "select * from ct_aplicacion_oferta_tb where oferta_id = :oferta",
			nativeQuery = true)
	List<AplicacionOferta> getByOferta(@Param("oferta") Long oferta);

}
