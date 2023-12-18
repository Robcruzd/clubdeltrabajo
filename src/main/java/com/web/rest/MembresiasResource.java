package com.web.rest;

import com.domain.Membresia;
import com.service.MembresiaService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.MembresiasCriteria;
import com.service.MembresiasQueryService;

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
 * REST controller for managing {@link com.domain.Membresia}.
 */
@RestController
@RequestMapping("/api")
public class MembresiasResource {

    private final Logger log = LoggerFactory.getLogger(MembresiasResource.class);

    private static final String ENTITY_NAME = "membresias";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MembresiaService membresiasService;

    private final MembresiasQueryService membresiasQueryService;

    public MembresiasResource(MembresiaService membresiasService, MembresiasQueryService membresiasQueryService) {
        this.membresiasService = membresiasService;
        this.membresiasQueryService = membresiasQueryService;
    }

    /**
     * {@code POST  /membresias} : Create a new membresias.
     *
     * @param membresias the membresias to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new membresias, or with status {@code 400 (Bad Request)} if the membresias has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/membresias")
    public ResponseEntity<Membresia> createMembresias(@Valid @RequestBody Membresia membresias) throws URISyntaxException {
        log.debug("REST request to save Membresias : {}", membresias);
        if (membresias.getId() != null) {
            throw new BadRequestAlertException("A new membresias cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Membresia result = membresiasService.save(membresias);
        return ResponseEntity.created(new URI("/api/membresias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /membresias} : Updates an existing membresias.
     *
     * @param membresias the membresias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated membresias,
     * or with status {@code 400 (Bad Request)} if the membresias is not valid,
     * or with status {@code 500 (Internal Server Error)} if the membresias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/membresias")
    public ResponseEntity<Membresia> updateMembresias(@Valid @RequestBody Membresia membresias) throws URISyntaxException {
        log.debug("REST request to update Membresias : {}", membresias);
        if (membresias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Membresia result = membresiasService.save(membresias);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, membresias.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /membresias} : get all the membresiass.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of membresiass in body.
     */
    @GetMapping("/membresias")
    public ResponseEntity<List<Membresia>> getAllMembresias(MembresiasCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Membresiass by criteria: {}", criteria);
        Page<Membresia> page = membresiasQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /membresias/count} : count all the membresias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/membresias/count")
    public ResponseEntity<Long> countMembresias(MembresiasCriteria criteria) {
        log.debug("REST request to count Membresias by criteria: {}", criteria);
        return ResponseEntity.ok().body(membresiasQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /membresias/:id} : get the "id" membresias.
     *
     * @param id the id of the membresias to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the membresias, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/membresias/{id}")
    public ResponseEntity<Membresia> getMembresias(@PathVariable Long id) {
        log.debug("REST request to get Membresias : {}", id);
        Optional<Membresia> membresias = membresiasService.findOne(id);
        return ResponseUtil.wrapOrNotFound(membresias);
    }

    /**
     * {@code DELETE  /membresias/:id} : delete the "id" membresias.
     *
     * @param id the id of the membresias to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/membresias/{id}")
    public ResponseEntity<Void> deleteMembresias(@PathVariable Long id) {
        log.debug("REST request to delete Membresias : {}", id);
        membresiasService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
