package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.domain.BdEmpresa;
import com.domain.Empresa;
import com.domain.Persona;

/**
 * Spring Data  repository for the TipoDocumento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BdEmpresaRepository extends JpaRepository<BdEmpresa, Long>, JpaSpecificationExecutor<BdEmpresa> {
	
//	@Query(value = "\r\n" + 
//			"select * from ct_bd_empresa_tb cbet where cbet.empresa_id=:idEmpresa",
//			nativeQuery = true)
//		List<BdEmpresa> findBdEmpresaByIdEmpresa(@Param("idEmpresa") Long idEmpresa);
	
	List<BdEmpresa> findByEmpresa(Empresa empresa);
	List<BdEmpresa> findByEmpresaAndUsuario(Persona usuario,Empresa empresa);
	List<BdEmpresa> findByUsuario(Persona persona);

}
