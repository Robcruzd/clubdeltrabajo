package com.repository;

import com.domain.InformacionLaboral;
import com.domain.MembresiaEmpresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@SuppressWarnings("unused")

@Repository
public interface MembresiaEmpresaRepository extends JpaRepository<MembresiaEmpresa, Long>, JpaSpecificationExecutor<MembresiaEmpresa> {

    @Query(value = "select * from ct_membresia_empresa_tb where empresa_id = :empresa and estado LIKE '%A%'",
        nativeQuery = true)
    List<MembresiaEmpresa> getByEmpresa(@Param("empresa") Long empresa);
}
