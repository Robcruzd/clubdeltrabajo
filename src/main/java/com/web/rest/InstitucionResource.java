package com.web.rest;

import com.domain.Institucion;
import com.service.InstitucionService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.InstitucionCriteria;
import com.service.InstitucionQueryService;

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
 * REST controller for managing {@link com.domain.Institucion}.
 */
@RestController
@RequestMapping("/api")
public class InstitucionResource {

    private final Logger log = LoggerFactory.getLogger(InstitucionResource.class);

    private static final String ENTITY_NAME = "institucion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InstitucionService institucionService;

    private final InstitucionQueryService institucionQueryService;

    public InstitucionResource(InstitucionService institucionService, InstitucionQueryService institucionQueryService) {
        this.institucionService = institucionService;
        this.institucionQueryService = institucionQueryService;
    }

    /**
     * {@code POST  /institucions} : Create a new institucion.
     *
     * @param institucion the institucion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new institucion, or with status {@code 400 (Bad Request)} if the institucion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/institucions")
    public ResponseEntity<Institucion> createInstitucion(@Valid @RequestBody Institucion institucion) throws URISyntaxException {
        log.debug("REST request to save Institucion : {}", institucion);
        if (institucion.getId() != null) {
            throw new BadRequestAlertException("A new institucion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Institucion result = institucionService.save(institucion);
        return ResponseEntity.created(new URI("/api/institucions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /institucions} : Updates an existing institucion.
     *
     * @param institucion the institucion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated institucion,
     * or with status {@code 400 (Bad Request)} if the institucion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the institucion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/institucions")
    public ResponseEntity<Institucion> updateInstitucion(@Valid @RequestBody Institucion institucion) throws URISyntaxException {
        log.debug("REST request to update Institucion : {}", institucion);
        if (institucion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Institucion result = institucionService.save(institucion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, institucion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /institucions} : get all the institucions.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of institucions in body.
     */
    @GetMapping("/institucions")
    public ResponseEntity<List<Institucion>> getAllInstitucions(InstitucionCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Institucions by criteria: {}", criteria);
        Page<Institucion> page = institucionQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /institucions/count} : count all the institucions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/institucions/count")
    public ResponseEntity<Long> countInstitucions(InstitucionCriteria criteria) {
        log.debug("REST request to count Institucions by criteria: {}", criteria);
        return ResponseEntity.ok().body(institucionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /institucions/:id} : get the "id" institucion.
     *
     * @param id the id of the institucion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the institucion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/institucions/{id}")
    public ResponseEntity<Institucion> getInstitucion(@PathVariable Long id) {
        log.debug("REST request to get Institucion : {}", id);
        Optional<Institucion> institucion = institucionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(institucion);
    }

    /**
     * {@code DELETE  /institucions/:id} : delete the "id" institucion.
     *
     * @param id the id of the institucion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/institucions/{id}")
    public ResponseEntity<Void> deleteInstitucion(@PathVariable Long id) {
        log.debug("REST request to delete Institucion : {}", id);
        institucionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
