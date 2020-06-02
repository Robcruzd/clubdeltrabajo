package com.repository;

import com.domain.InformacionLaboral;
import com.domain.Persona;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InformacionLaboral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionLaboralRepository
extends JpaRepository<InformacionLaboral, Long>, JpaSpecificationExecutor<InformacionLaboral> {

List<InformacionLaboral> findByUsuario(Persona usuario);
}
