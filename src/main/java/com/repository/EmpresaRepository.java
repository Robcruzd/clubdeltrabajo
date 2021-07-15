package com.repository;

import com.domain.Empresa;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data  repository for the Empresa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>, JpaSpecificationExecutor<Empresa> {

    @Query(value = "\r\n" + 
		"select * from ct_empresa_tb ctp where unaccent(lower(ctp.razon_social)) like unaccent(lower(concat('%', ?1,'%')))",
		nativeQuery = true)
	List<Empresa> findByRazonSocialLikeUsingQueryAnnotation(@Param("empresa") String empresa);
}
