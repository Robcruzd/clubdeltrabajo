package com.web.rest;

import com.domain.Idioma;
import com.service.IdiomaService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.IdiomaCriteria;
import com.service.IdiomaQueryService;

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
 * REST controller for managing {@link com.domain.Idioma}.
 */
@RestController
@RequestMapping("/api")
public class IdiomaResource {

    private final Logger log = LoggerFactory.getLogger(IdiomaResource.class);

    private static final String ENTITY_NAME = "idioma";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IdiomaService idiomaService;

    private final IdiomaQueryService idiomaQueryService;

    public IdiomaResource(IdiomaService idiomaService, IdiomaQueryService idiomaQueryService) {
        this.idiomaService = idiomaService;
        this.idiomaQueryService = idiomaQueryService;
    }

    /**
     * {@code POST  /idiomas} : Create a new idioma.
     *
     * @param idioma the idioma to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new idioma, or with status {@code 400 (Bad Request)} if the idioma has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/idiomas")
    public ResponseEntity<Idioma> createIdioma(@Valid @RequestBody Idioma idioma) throws URISyntaxException {
        log.debug("REST request to save Idioma : {}", idioma);
        if (idioma.getId() != null) {
            throw new BadRequestAlertException("A new idioma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Idioma result = idiomaService.save(idioma);
        return ResponseEntity.created(new URI("/api/idiomas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /idiomas} : Updates an existing idioma.
     *
     * @param idioma the idioma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated idioma,
     * or with status {@code 400 (Bad Request)} if the idioma is not valid,
     * or with status {@code 500 (Internal Server Error)} if the idioma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/idiomas")
    public ResponseEntity<Idioma> updateIdioma(@Valid @RequestBody Idioma idioma) throws URISyntaxException {
        log.debug("REST request to update Idioma : {}", idioma);
        if (idioma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Idioma result = idiomaService.save(idioma);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, idioma.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /idiomas} : get all the idiomas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of idiomas in body.
     */
    @GetMapping("/idiomas")
    public ResponseEntity<List<Idioma>> getAllIdiomas(IdiomaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Idiomas by criteria: {}", criteria);
        Page<Idioma> page = idiomaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /idiomas/count} : count all the idiomas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/idiomas/count")
    public ResponseEntity<Long> countIdiomas(IdiomaCriteria criteria) {
        log.debug("REST request to count Idiomas by criteria: {}", criteria);
        return ResponseEntity.ok().body(idiomaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /idiomas/:id} : get the "id" idioma.
     *
     * @param id the id of the idioma to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the idioma, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/idiomas/{id}")
    public ResponseEntity<Idioma> getIdioma(@PathVariable Long id) {
        log.debug("REST request to get Idioma : {}", id);
        Optional<Idioma> idioma = idiomaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(idioma);
    }

    /**
     * {@code DELETE  /idiomas/:id} : delete the "id" idioma.
     *
     * @param id the id of the idioma to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/idiomas/{id}")
    public ResponseEntity<Void> deleteIdioma(@PathVariable Long id) {
        log.debug("REST request to delete Idioma : {}", id);
        idiomaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
