package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.domain.InformacionAcademica;
import com.domain.Persona;

/**
 * Spring Data repository for the InformacionAcademica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionAcademicaRepository
		extends JpaRepository<InformacionAcademica, Long>, JpaSpecificationExecutor<InformacionAcademica> {

	List<InformacionAcademica> findByUsuario(Persona usuario);
	
	@Query(value = "select * from ct_informacion_academica_tb where usuario_id = :persona",
	nativeQuery = true)
	List<InformacionAcademica> getByPersona(@Param("persona") Long persona);
}
