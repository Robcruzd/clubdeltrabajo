package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.domain.Archivo;
import com.service.ArchivoQueryService;
import com.service.ArchivoService;
import com.service.dto.ArchivoCriteria;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.domain.Archivo}.
 */
@RestController
@RequestMapping("/api")
public class ArchivoResource {

	private final Logger log = LoggerFactory.getLogger(ArchivoResource.class);

	private static final String ENTITY_NAME = "archivo";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final ArchivoService archivoService;

	private final ArchivoQueryService archivoQueryService;

	public ArchivoResource(ArchivoService archivoService, ArchivoQueryService archivoQueryService) {
		this.archivoService = archivoService;
		this.archivoQueryService = archivoQueryService;
	}

	/**
	 * {@code POST  /archivos} : Create a new archivo.
	 *
	 * @param archivo the archivo to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new archivo, or with status {@code 400 (Bad Request)} if the
	 *         archivo has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/archivos")
	public ResponseEntity<Archivo> createArchivo(@Valid @RequestBody Archivo archivo) throws URISyntaxException {
		log.debug("REST request to save Archivo : {}", archivo);
		if (archivo.getId() != null) {
			throw new BadRequestAlertException("A new archivo cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Archivo result = archivoService.save(archivo);
		return ResponseEntity
				.created(new URI("/api/archivos/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code POST  /archivos/hoja-vida} : save all the archivos.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of archivos in body.
	 */
	@PostMapping("/archivos/hoja-vida")
	public ResponseEntity<List<Archivo>> saveAllArchivos(List<Archivo> archivos) {
		log.debug("REST request to save Archivos {}", archivos);
		List<Archivo> result = archivoService.saveAll(archivos);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, String.valueOf(result.size())))
				.body(result);
	}

	/**
	 * {@code PUT  /archivos} : Updates an existing archivo.
	 *
	 * @param archivo the archivo to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated archivo, or with status {@code 400 (Bad Request)} if the
	 *         archivo is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the archivo couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/archivos")
	public ResponseEntity<Archivo> updateArchivo(@Valid @RequestBody Archivo archivo) throws URISyntaxException {
		log.debug("REST request to update Archivo : {}", archivo);
		if (archivo.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Archivo result = archivoService.save(archivo);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, archivo.getId().toString()))
				.body(result);
	}

	/**
	 * {@code GET  /archivos} : get all the archivos.
	 *
	 * @param pageable the pagination information.
	 * @param criteria the criteria which the requested entities should match.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of archivos in body.
	 */
	@GetMapping("/archivos")
	public ResponseEntity<List<Archivo>> getAllArchivos(ArchivoCriteria criteria, Pageable pageable) {
		log.debug("REST request to get Archivos by criteria: {}", criteria);
		Page<Archivo> page = archivoQueryService.findByCriteria(criteria, pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code GET  /archivos/count} : count all the archivos.
	 *
	 * @param criteria the criteria which the requested entities should match.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count
	 *         in body.
	 */
	@GetMapping("/archivos/count")
	public ResponseEntity<Long> countArchivos(ArchivoCriteria criteria) {
		log.debug("REST request to count Archivos by criteria: {}", criteria);
		return ResponseEntity.ok().body(archivoQueryService.countByCriteria(criteria));
	}

	/**
	 * {@code GET  /archivos/:id} : get the "id" archivo.
	 *
	 * @param id the id of the archivo to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the archivo, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/archivos/{id}")
	public ResponseEntity<Archivo> getArchivo(@PathVariable Long id) {
		log.debug("REST request to get Archivo : {}", id);
		Optional<Archivo> archivo = archivoService.findOne(id);
		return ResponseUtil.wrapOrNotFound(archivo);
	}

	/**
	 * {@code DELETE  /archivos/:id} : delete the "id" archivo.
	 *
	 * @param id the id of the archivo to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/archivos/{id}")
	public ResponseEntity<Void> deleteArchivo(@PathVariable Long id) {
		log.debug("REST request to delete Archivo : {}", id);
		archivoService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}
}
