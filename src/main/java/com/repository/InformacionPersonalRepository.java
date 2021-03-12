package com.repository;

import com.domain.InformacionPersonal;
import com.domain.Persona;
import com.domain.Profesion;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InformacionPersonal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionPersonalRepository
extends JpaRepository<InformacionPersonal, Long>, JpaSpecificationExecutor<InformacionPersonal> {

InformacionPersonal findByUsuario(Persona usuario);

	List<InformacionPersonal> findByProfesion(@Param("profesion") Profesion profesion);
}
