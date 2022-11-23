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

	@Query(value = "select * from \r\n" +
			"ct_aplicacion_oferta_tb apo\r\n" +
			"join ct_oferta_tb ofe on apo.oferta_id = ofe.id \r\n" +
			"where ofe.activado = true and apo.usuario_id = :persona",
	nativeQuery = true)
	List<AplicacionOferta> getByPersona(@Param("persona") Long persona);

	@Query(value = "select * from ct_aplicacion_oferta_tb where (estado LIKE '%Ninguno%' or estado LIKE '%Seleccionado%' or estado LIKE '%Descartado%') and oferta_id = :oferta",
			nativeQuery = true)
	List<AplicacionOferta> getByOferta(@Param("oferta") Long oferta);

	@Query(value = "select * from ct_aplicacion_oferta_tb oferta_id = :oferta and usuario_id = :persona",
			nativeQuery = true)
	List<AplicacionOferta> getByOfertaAndPersona(@Param("oferta") Long oferta, @Param("persona") Long persona);

}
