package com.web.rest;

import com.domain.Profesion;
import com.service.ProfesionService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.ProfesionCriteria;
import com.service.ProfesionQueryService;

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
 * REST controller for managing {@link com.domain.Profesion}.
 */
@RestController
@RequestMapping("/api")
public class ProfesionResource {

    private final Logger log = LoggerFactory.getLogger(ProfesionResource.class);

    private static final String ENTITY_NAME = "profesion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfesionService profesionService;

    private final ProfesionQueryService profesionQueryService;

    public ProfesionResource(ProfesionService profesionService, ProfesionQueryService profesionQueryService) {
        this.profesionService = profesionService;
        this.profesionQueryService = profesionQueryService;
    }

    /**
     * {@code POST  /profesions} : Create a new profesion.
     *
     * @param profesion the profesion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profesion, or with status {@code 400 (Bad Request)} if the profesion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profesions")
    public ResponseEntity<Profesion> createProfesion(@Valid @RequestBody Profesion profesion) throws URISyntaxException {
        log.debug("REST request to save Profesion : {}", profesion);
        if (profesion.getId() != null) {
            throw new BadRequestAlertException("A new profesion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profesion result = profesionService.save(profesion);
        return ResponseEntity.created(new URI("/api/profesions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profesions} : Updates an existing profesion.
     *
     * @param profesion the profesion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profesion,
     * or with status {@code 400 (Bad Request)} if the profesion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profesion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profesions")
    public ResponseEntity<Profesion> updateProfesion(@Valid @RequestBody Profesion profesion) throws URISyntaxException {
        log.debug("REST request to update Profesion : {}", profesion);
        if (profesion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Profesion result = profesionService.save(profesion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profesion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profesions} : get all the profesions.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profesions in body.
     */
    @GetMapping("/profesions")
    public ResponseEntity<List<Profesion>> getAllProfesions(ProfesionCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Profesions by criteria: {}", criteria);
        Page<Profesion> page = profesionQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /profesions/count} : count all the profesions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/profesions/count")
    public ResponseEntity<Long> countProfesions(ProfesionCriteria criteria) {
        log.debug("REST request to count Profesions by criteria: {}", criteria);
        return ResponseEntity.ok().body(profesionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /profesions/:id} : get the "id" profesion.
     *
     * @param id the id of the profesion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profesion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profesions/{id}")
    public ResponseEntity<Profesion> getProfesion(@PathVariable Long id) {
        log.debug("REST request to get Profesion : {}", id);
        Optional<Profesion> profesion = profesionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(profesion);
    }

    /**
     * {@code DELETE  /profesions/:id} : delete the "id" profesion.
     *
     * @param id the id of the profesion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profesions/{id}")
    public ResponseEntity<Void> deleteProfesion(@PathVariable Long id) {
        log.debug("REST request to delete Profesion : {}", id);
        profesionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
