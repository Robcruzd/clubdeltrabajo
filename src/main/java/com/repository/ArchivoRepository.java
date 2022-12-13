package com.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.domain.Archivo;
import com.domain.Empresa;
import com.domain.InformacionAcademica;
import com.domain.InformacionLaboral;
import com.domain.Persona;

/**
 * Spring Data  repository for the Archivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArchivoRepository extends JpaRepository<Archivo, Long>, JpaSpecificationExecutor<Archivo> {

    List<Archivo> findByUsuario(Persona usuario);

    List<Archivo> findByUsuarioOrderByTipoAsc(Persona usuario);

    Archivo findFirstByUsuarioAndTipoOrderByIdDesc(Persona usuario, Integer tipo);
    
    Archivo findFirstByEmpresaAndTipoOrderByIdDesc(Empresa empresa, Integer tipo);

    Long deleteByInformacionAcademica(InformacionAcademica informacionAcademica);

    Long deleteByInformacionLaboral(InformacionLaboral informacionLaboral);
    
    @Query(value = "select * from ct_archivo_tb where tipo = :tipo and empresa_id = :empresa",
			nativeQuery = true)
	List<Archivo> getArchivoByTipoAndEmpresa(@Param("tipo") Long tipo, @Param("empresa") Long empresa);

    Optional<Archivo> findById(Long id);

    void deleteById(Long id);
}
