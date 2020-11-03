package com.repository;

import com.domain.Oferta;
import com.service.dto.OfertaCriteria;

import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.StringFilter;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Oferta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long>, JpaSpecificationExecutor<Oferta> {
	
	List<Oferta> findByCiudadAndExperiencia(IntegerFilter ciudad, StringFilter experiencia);
}
