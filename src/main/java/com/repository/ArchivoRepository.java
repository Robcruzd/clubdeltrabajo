package com.repository;

import java.util.List;

import com.domain.Archivo;
import com.domain.Persona;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Archivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArchivoRepository extends JpaRepository<Archivo, Long>, JpaSpecificationExecutor<Archivo> {

    List<Archivo> findByUsuario(Persona usuario);

    List<Archivo> findByUsuarioOrderByTipoAsc(Persona usuario);

    Archivo findFirstByUsuarioAndTipoOrderByIdDesc(Persona usuario, Integer tipo);
}
