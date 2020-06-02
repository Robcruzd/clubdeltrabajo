package com.repository;

import com.domain.InformacionPersonal;
import com.domain.Persona;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InformacionPersonal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionPersonalRepository
extends JpaRepository<InformacionPersonal, Long>, JpaSpecificationExecutor<InformacionPersonal> {

InformacionPersonal findByUsuario(Persona usuario);
}
