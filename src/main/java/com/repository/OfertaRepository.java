package com.repository;

import com.domain.Empresa;
import com.domain.Oferta;
import com.service.dto.OfertaCriteria;

import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.StringFilter;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Oferta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long>, JpaSpecificationExecutor<Oferta> {
	
	List<Oferta> findByCiudadAndExperiencia(IntegerFilter ciudad, StringFilter experiencia);
	
	@Query(value = "SELECT * FROM public.ct_oferta_tb\r\n" + 
			"where salario =  :salario or ciudad = :ciudad", 
			nativeQuery = true)
	List<Oferta> getOfertasFiltro(@Param("salario") Long salario, @Param("ciudad") Long ciudad);
	
	@Query(value = "SELECT * FROM public.ct_oferta_tb\r\n" + 
			"where usuario_id =  :usuario_id", 
			nativeQuery = true)
	List<Oferta> getOfertasEmpresa(@Param("usuario_id") Long usuario_id);
	
	List<Oferta> findByUsuarioOrderByFechaPublicacionDesc(Empresa usuario);
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where salario = :salario and ciudad = :ciudad and fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n",
			nativeQuery = true)
	List<Oferta> getOfertasFiltroAll(@Param("salario") Long salario, @Param("ciudad") Long ciudad,@Param("fecha") Date fecha);
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where salario = :salario and fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n", 
			nativeQuery = true)
	List<Oferta> getOfertasFiltroFechaSalario(@Param("salario") Long salario,@Param("fecha") Date fecha);
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where ciudad = :ciudad and fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n",
			nativeQuery = true)
	List<Oferta> getOfertasFiltroFechaCiudad(@Param("ciudad") Long ciudad,@Param("fecha") Date fecha);
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n", 
			nativeQuery = true)
	List<Oferta> getOfertasFiltroFecha(@Param("fecha") Date fecha);
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where salario = :salario and ciudad = :ciudad and profesion = :profesion and fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n",
			nativeQuery = true)
	List<Oferta> getOfertasFiltroAllProfesion(@Param("salario") Long salario, @Param("ciudad") Long ciudad,@Param("fecha") Date fecha,@Param("profesion") Long profesion );
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where salario = :salario and profesion = :profesion and fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n", 
			nativeQuery = true)
	List<Oferta> getOfertasFiltroFechaSalarioProfesion(@Param("salario") Long salario,@Param("fecha") Date fecha,@Param("profesion") Long profesion);
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where ciudad = :ciudad and profesion = :profesion and fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n",
			nativeQuery = true)
	List<Oferta> getOfertasFiltroFechaCiudadProfesion(@Param("ciudad") Long ciudad,@Param("fecha") Date fecha,@Param("profesion") Long profesion);
	
	@Query(value = "select\r\n" + 
			"* from ct_oferta_tb \r\n" + 
			"where profesion = :profesion and fecha_publicacion BETWEEN :fecha and CURRENT_DATE order by id desc\r\n", 
			nativeQuery = true)
	List<Oferta> getOfertasFiltroFechaProfesion(@Param("fecha") Date fecha,@Param("profesion") Long profesion);

	@Query(value = "select * from ct_oferta_tb cot2\r\n" +
			"where cot2.estado = 'A'\r\n" +
			"order by fecha_publicacion_vip desc nulls last, fecha_publicacion desc, profesion nulls last\r\n" +
			"limit 5", 
			nativeQuery = true)
	List<Oferta> getOfertasDestacadas();
}
