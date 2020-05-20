package com.web.rest;

import com.domain.NivelIdioma;
import com.service.NivelIdiomaService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.NivelIdiomaCriteria;
import com.service.NivelIdiomaQueryService;

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
 * REST controller for managing {@link com.domain.NivelIdioma}.
 */
@RestController
@RequestMapping("/api")
public class NivelIdiomaResource {

    private final Logger log = LoggerFactory.getLogger(NivelIdiomaResource.class);

    private static final String ENTITY_NAME = "nivelIdioma";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NivelIdiomaService nivelIdiomaService;

    private final NivelIdiomaQueryService nivelIdiomaQueryService;

    public NivelIdiomaResource(NivelIdiomaService nivelIdiomaService, NivelIdiomaQueryService nivelIdiomaQueryService) {
        this.nivelIdiomaService = nivelIdiomaService;
        this.nivelIdiomaQueryService = nivelIdiomaQueryService;
    }

    /**
     * {@code POST  /nivel-idiomas} : Create a new nivelIdioma.
     *
     * @param nivelIdioma the nivelIdioma to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nivelIdioma, or with status {@code 400 (Bad Request)} if the nivelIdioma has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nivel-idiomas")
    public ResponseEntity<NivelIdioma> createNivelIdioma(@Valid @RequestBody NivelIdioma nivelIdioma) throws URISyntaxException {
        log.debug("REST request to save NivelIdioma : {}", nivelIdioma);
        if (nivelIdioma.getId() != null) {
            throw new BadRequestAlertException("A new nivelIdioma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NivelIdioma result = nivelIdiomaService.save(nivelIdioma);
        return ResponseEntity.created(new URI("/api/nivel-idiomas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nivel-idiomas} : Updates an existing nivelIdioma.
     *
     * @param nivelIdioma the nivelIdioma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nivelIdioma,
     * or with status {@code 400 (Bad Request)} if the nivelIdioma is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nivelIdioma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nivel-idiomas")
    public ResponseEntity<NivelIdioma> updateNivelIdioma(@Valid @RequestBody NivelIdioma nivelIdioma) throws URISyntaxException {
        log.debug("REST request to update NivelIdioma : {}", nivelIdioma);
        if (nivelIdioma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NivelIdioma result = nivelIdiomaService.save(nivelIdioma);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nivelIdioma.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nivel-idiomas} : get all the nivelIdiomas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nivelIdiomas in body.
     */
    @GetMapping("/nivel-idiomas")
    public ResponseEntity<List<NivelIdioma>> getAllNivelIdiomas(NivelIdiomaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get NivelIdiomas by criteria: {}", criteria);
        Page<NivelIdioma> page = nivelIdiomaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /nivel-idiomas/count} : count all the nivelIdiomas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/nivel-idiomas/count")
    public ResponseEntity<Long> countNivelIdiomas(NivelIdiomaCriteria criteria) {
        log.debug("REST request to count NivelIdiomas by criteria: {}", criteria);
        return ResponseEntity.ok().body(nivelIdiomaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /nivel-idiomas/:id} : get the "id" nivelIdioma.
     *
     * @param id the id of the nivelIdioma to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nivelIdioma, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nivel-idiomas/{id}")
    public ResponseEntity<NivelIdioma> getNivelIdioma(@PathVariable Long id) {
        log.debug("REST request to get NivelIdioma : {}", id);
        Optional<NivelIdioma> nivelIdioma = nivelIdiomaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nivelIdioma);
    }

    /**
     * {@code DELETE  /nivel-idiomas/:id} : delete the "id" nivelIdioma.
     *
     * @param id the id of the nivelIdioma to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nivel-idiomas/{id}")
    public ResponseEntity<Void> deleteNivelIdioma(@PathVariable Long id) {
        log.debug("REST request to delete NivelIdioma : {}", id);
        nivelIdiomaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
