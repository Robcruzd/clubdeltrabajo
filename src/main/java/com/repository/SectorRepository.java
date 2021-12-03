package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.domain.Sector;

/**
 * Spring Data  repository for the TipoDocumento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SectorRepository extends JpaRepository<Sector, Long>, JpaSpecificationExecutor<Sector> {
	
	@Query(value = "\r\n" + 
			"select * from ct_sector_tb",
			nativeQuery = true)
		List<Sector> findAllSector();
	
	@Query(value = "\r\n" + 
			"select * from ct_sector_tb sec where sec.id =: id",
			nativeQuery = true)
		List<Sector> findSectorById(@Param("id") Long id);
}
