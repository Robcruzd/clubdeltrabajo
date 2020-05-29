package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.domain.InformacionPersonal;
import com.domain.Persona;

/**
 * Spring Data repository for the InformacionPersonal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionPersonalRepository
		extends JpaRepository<InformacionPersonal, Long>, JpaSpecificationExecutor<InformacionPersonal> {

	InformacionPersonal findByUsuario(Persona usuario);
}
