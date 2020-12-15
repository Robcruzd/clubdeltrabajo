package com.web.rest;

import com.domain.Regiones;
import com.service.RegionesService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.RegionesCriteria;
import com.service.RegionesQueryService;

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
 * REST controller for managing {@link com.domain.Regiones}.
 */
@RestController
@RequestMapping("/api")
public class RegionesResource {

    private final Logger log = LoggerFactory.getLogger(RegionesResource.class);

    private static final String ENTITY_NAME = "regiones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RegionesService regionesService;

    private final RegionesQueryService regionesQueryService;

    public RegionesResource(RegionesService regionesService, RegionesQueryService regionesQueryService) {
        this.regionesService = regionesService;
        this.regionesQueryService = regionesQueryService;
    }

    /**
     * {@code POST  /regiones} : Create a new regiones.
     *
     * @param regiones the regiones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new regiones, or with status {@code 400 (Bad Request)} if the regiones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/regiones")
    public ResponseEntity<Regiones> createRegiones(@Valid @RequestBody Regiones regiones) throws URISyntaxException {
        log.debug("REST request to save Regiones : {}", regiones);
        if (regiones.getId() != null) {
            throw new BadRequestAlertException("A new regiones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Regiones result = regionesService.save(regiones);
        return ResponseEntity.created(new URI("/api/regiones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /regiones} : Updates an existing regiones.
     *
     * @param regiones the regiones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regiones,
     * or with status {@code 400 (Bad Request)} if the regiones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the regiones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/regiones")
    public ResponseEntity<Regiones> updateRegiones(@Valid @RequestBody Regiones regiones) throws URISyntaxException {
        log.debug("REST request to update Regiones : {}", regiones);
        if (regiones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Regiones result = regionesService.save(regiones);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, regiones.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /regiones} : get all the regioness.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of regioness in body.
     */
    @GetMapping("/regiones")
    public ResponseEntity<List<Regiones>> getAllRegiones(RegionesCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Regioness by criteria: {}", criteria);
        Page<Regiones> page = regionesQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /regiones/count} : count all the regiones.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/regiones/count")
    public ResponseEntity<Long> countRegiones(RegionesCriteria criteria) {
        log.debug("REST request to count Regiones by criteria: {}", criteria);
        return ResponseEntity.ok().body(regionesQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /regiones/:id} : get the "id" regiones.
     *
     * @param id the id of the regiones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the regiones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/regiones/{id}")
    public ResponseEntity<Regiones> getRegiones(@PathVariable Long id) {
        log.debug("REST request to get Regiones : {}", id);
        Optional<Regiones> regiones = regionesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(regiones);
    }

    /**
     * {@code DELETE  /regiones/:id} : delete the "id" regiones.
     *
     * @param id the id of the regiones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/regiones/{id}")
    public ResponseEntity<Void> deleteRegiones(@PathVariable Long id) {
        log.debug("REST request to delete Regiones : {}", id);
        regionesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
