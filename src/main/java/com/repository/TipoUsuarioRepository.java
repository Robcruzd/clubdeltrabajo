package com.repository;

import com.domain.TipoUsuario;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoUsuarioRepository extends JpaRepository<TipoUsuario, Long>, JpaSpecificationExecutor<TipoUsuario> {
}
