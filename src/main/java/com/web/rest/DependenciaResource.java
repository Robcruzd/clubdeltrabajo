package com.web.rest;

import com.domain.Dependencia;
import com.service.DependenciaService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.DependenciaCriteria;
import com.service.DependenciaQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.domain.Dependencia}.
 */
@RestController
@RequestMapping("/api")
public class DependenciaResource {

    private final Logger log = LoggerFactory.getLogger(DependenciaResource.class);

    private static final String ENTITY_NAME = "dependencia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DependenciaService dependenciaService;

    private final DependenciaQueryService dependenciaQueryService;

    public DependenciaResource(DependenciaService dependenciaService, DependenciaQueryService dependenciaQueryService) {
        this.dependenciaService = dependenciaService;
        this.dependenciaQueryService = dependenciaQueryService;
    }

    /**
     * {@code POST  /dependencias} : Create a new dependencia.
     *
     * @param dependencia the dependencia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dependencia, or with status {@code 400 (Bad Request)} if the dependencia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dependencias")
    public ResponseEntity<Dependencia> createDependencia(@Valid @RequestBody Dependencia dependencia) throws URISyntaxException {
        log.debug("REST request to save Dependencia : {}", dependencia);
        if (dependencia.getId() != null) {
            throw new BadRequestAlertException("A new dependencia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dependencia result = dependenciaService.save(dependencia);
        return ResponseEntity.created(new URI("/api/dependencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dependencias} : Updates an existing dependencia.
     *
     * @param dependencia the dependencia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dependencia,
     * or with status {@code 400 (Bad Request)} if the dependencia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dependencia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dependencias")
    public ResponseEntity<Dependencia> updateDependencia(@Valid @RequestBody Dependencia dependencia) throws URISyntaxException {
        log.debug("REST request to update Dependencia : {}", dependencia);
        if (dependencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dependencia result = dependenciaService.save(dependencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dependencia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dependencias} : get all the dependencias.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dependencias in body.
     */
    @GetMapping("/dependencias")
    public ResponseEntity<List<Dependencia>> getAllDependencias(DependenciaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Dependencias by criteria: {}", criteria);
        Page<Dependencia> page = dependenciaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /dependencias/count} : count all the dependencias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/dependencias/count")
    public ResponseEntity<Long> countDependencias(DependenciaCriteria criteria) {
        log.debug("REST request to count Dependencias by criteria: {}", criteria);
        return ResponseEntity.ok().body(dependenciaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /dependencias/:id} : get the "id" dependencia.
     *
     * @param id the id of the dependencia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dependencia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dependencias/{id}")
    public ResponseEntity<Dependencia> getDependencia(@PathVariable Long id) {
        log.debug("REST request to get Dependencia : {}", id);
        Optional<Dependencia> dependencia = dependenciaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dependencia);
    }

    /**
     * {@code DELETE  /dependencias/:id} : delete the "id" dependencia.
     *
     * @param id the id of the dependencia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dependencias/{id}")
    public ResponseEntity<Void> deleteDependencia(@PathVariable Long id) {
        log.debug("REST request to delete Dependencia : {}", id);
        dependenciaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
