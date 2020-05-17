package com.web.rest;

import com.domain.InformacionPersonal;
import com.service.InformacionPersonalService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.InformacionPersonalCriteria;
import com.service.InformacionPersonalQueryService;

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
 * REST controller for managing {@link com.domain.InformacionPersonal}.
 */
@RestController
@RequestMapping("/api")
public class InformacionPersonalResource {

    private final Logger log = LoggerFactory.getLogger(InformacionPersonalResource.class);

    private static final String ENTITY_NAME = "informacionPersonal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InformacionPersonalService informacionPersonalService;

    private final InformacionPersonalQueryService informacionPersonalQueryService;

    public InformacionPersonalResource(InformacionPersonalService informacionPersonalService, InformacionPersonalQueryService informacionPersonalQueryService) {
        this.informacionPersonalService = informacionPersonalService;
        this.informacionPersonalQueryService = informacionPersonalQueryService;
    }

    /**
     * {@code POST  /informacion-personals} : Create a new informacionPersonal.
     *
     * @param informacionPersonal the informacionPersonal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new informacionPersonal, or with status {@code 400 (Bad Request)} if the informacionPersonal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/informacion-personals")
    public ResponseEntity<InformacionPersonal> createInformacionPersonal(@Valid @RequestBody InformacionPersonal informacionPersonal) throws URISyntaxException {
        log.debug("REST request to save InformacionPersonal : {}", informacionPersonal);
        if (informacionPersonal.getId() != null) {
            throw new BadRequestAlertException("A new informacionPersonal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InformacionPersonal result = informacionPersonalService.save(informacionPersonal);
        return ResponseEntity.created(new URI("/api/informacion-personals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /informacion-personals} : Updates an existing informacionPersonal.
     *
     * @param informacionPersonal the informacionPersonal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated informacionPersonal,
     * or with status {@code 400 (Bad Request)} if the informacionPersonal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the informacionPersonal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/informacion-personals")
    public ResponseEntity<InformacionPersonal> updateInformacionPersonal(@Valid @RequestBody InformacionPersonal informacionPersonal) throws URISyntaxException {
        log.debug("REST request to update InformacionPersonal : {}", informacionPersonal);
        if (informacionPersonal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InformacionPersonal result = informacionPersonalService.save(informacionPersonal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, informacionPersonal.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /informacion-personals} : get all the informacionPersonals.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of informacionPersonals in body.
     */
    @GetMapping("/informacion-personals")
    public ResponseEntity<List<InformacionPersonal>> getAllInformacionPersonals(InformacionPersonalCriteria criteria, Pageable pageable) {
        log.debug("REST request to get InformacionPersonals by criteria: {}", criteria);
        Page<InformacionPersonal> page = informacionPersonalQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /informacion-personals/count} : count all the informacionPersonals.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/informacion-personals/count")
    public ResponseEntity<Long> countInformacionPersonals(InformacionPersonalCriteria criteria) {
        log.debug("REST request to count InformacionPersonals by criteria: {}", criteria);
        return ResponseEntity.ok().body(informacionPersonalQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /informacion-personals/:id} : get the "id" informacionPersonal.
     *
     * @param id the id of the informacionPersonal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the informacionPersonal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/informacion-personals/{id}")
    public ResponseEntity<InformacionPersonal> getInformacionPersonal(@PathVariable Long id) {
        log.debug("REST request to get InformacionPersonal : {}", id);
        Optional<InformacionPersonal> informacionPersonal = informacionPersonalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(informacionPersonal);
    }

    /**
     * {@code DELETE  /informacion-personals/:id} : delete the "id" informacionPersonal.
     *
     * @param id the id of the informacionPersonal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/informacion-personals/{id}")
    public ResponseEntity<Void> deleteInformacionPersonal(@PathVariable Long id) {
        log.debug("REST request to delete InformacionPersonal : {}", id);
        informacionPersonalService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
