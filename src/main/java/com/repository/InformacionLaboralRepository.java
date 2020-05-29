package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.domain.InformacionLaboral;
import com.domain.Persona;

/**
 * Spring Data repository for the InformacionLaboral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformacionLaboralRepository
		extends JpaRepository<InformacionLaboral, Long>, JpaSpecificationExecutor<InformacionLaboral> {

	List<InformacionLaboral> findByUsuario(Persona usuario);
}
