package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.domain.Profesion;

/**
 * Spring Data  repository for the Profesion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfesionRepository extends JpaRepository<Profesion, Long>, JpaSpecificationExecutor<Profesion> {
		
	List<Profesion> findByProfesionContainingIgnoreCase(@Param("profesion") String profesion);
	
	@Query(value = "\r\n" + 
			"select * from ct_profesion_tb where id = :profesion", 
			nativeQuery = true)
	Profesion findByIdQuery(@Param("profesion") Long profesion);

	@Query(value = "\r\n" + 
		"select * from ct_profesion_tb ctp where unaccent(lower(ctp.profesion)) like unaccent(lower(concat('%', ?1,'%')))",
		nativeQuery = true)
	List<Profesion> findByProfesionLikeUsingQueryAnnotation(@Param("profesion") String profesion);

	@Query(value = "\r\n" + 
		"select * from ct_profesion_tb ctp where unaccent(lower(ctp.profesion)) like unaccent(lower(concat('%', ?1,'%')))",
		nativeQuery = true)
	List<Profesion> findPersonasyOfertaByQuery(@Param("profesion") String profesion);

	@Query(value = "\r\n" + 
		"select distinct(cpt.id), cpt.profesion from ct_profesion_tb cpt "+
		"right join ct_oferta_tb cot2 on cpt.id = cot2.profesion where cpt.id is not null "+
		"order by cpt.id",
		nativeQuery = true)
	List<Profesion> findProfesionesByOfertas();

	// @Query(value = "\r\n" + 
	// 	"select * from ct_profesion_tb cpt where to_tsquery('administrador') <@ to_tsvector(cpt.profesion)",
	// 	nativeQuery = true)
	// List<Profesion> findByProfesionLikeUsingQueryAnnotation(@Param("profesion") String profesion);
}
