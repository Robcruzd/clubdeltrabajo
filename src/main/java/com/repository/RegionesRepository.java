package com.repository;

import com.domain.Regiones;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data  repository for the Cargo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegionesRepository extends JpaRepository<Regiones, Long>, JpaSpecificationExecutor<Regiones> {

    Regiones findByCodigoDaneDelMunicipio(@Param("codigo_dane_del_municipio") Integer codigoDane);
}
