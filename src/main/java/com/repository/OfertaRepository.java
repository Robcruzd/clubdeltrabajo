package com.repository;

import com.domain.Empresa;
import com.domain.Oferta;
import com.service.dto.OfertaCriteria;

import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.StringFilter;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Oferta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long>, JpaSpecificationExecutor<Oferta> {
	
	List<Oferta> findByCiudadAndExperiencia(IntegerFilter ciudad, StringFilter experiencia);
	
	@Query(value = "SELECT * FROM public.ct_oferta_tb\r\n" + 
			"where salario =  :salario or ciudad = :ciudad", 
			nativeQuery = true)
	List<Oferta> getOfertasFiltro(@Param("salario") Long salario, @Param("ciudad") Long ciudad);
	
	@Query(value = "SELECT * FROM public.ct_oferta_tb\r\n" + 
			"where usuario_id =  :usuario_id", 
			nativeQuery = true)
	List<Oferta> getOfertasEmpresa(@Param("usuario_id") Long usuario_id);
	
	List<Oferta> findByUsuario(Empresa usuario);
}
