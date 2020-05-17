package com.web.rest;

import com.domain.InformacionLaboral;
import com.service.InformacionLaboralService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.InformacionLaboralCriteria;
import com.service.InformacionLaboralQueryService;

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
 * REST controller for managing {@link com.domain.InformacionLaboral}.
 */
@RestController
@RequestMapping("/api")
public class InformacionLaboralResource {

    private final Logger log = LoggerFactory.getLogger(InformacionLaboralResource.class);

    private static final String ENTITY_NAME = "informacionLaboral";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InformacionLaboralService informacionLaboralService;

    private final InformacionLaboralQueryService informacionLaboralQueryService;

    public InformacionLaboralResource(InformacionLaboralService informacionLaboralService, InformacionLaboralQueryService informacionLaboralQueryService) {
        this.informacionLaboralService = informacionLaboralService;
        this.informacionLaboralQueryService = informacionLaboralQueryService;
    }

    /**
     * {@code POST  /informacion-laborals} : Create a new informacionLaboral.
     *
     * @param informacionLaboral the informacionLaboral to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new informacionLaboral, or with status {@code 400 (Bad Request)} if the informacionLaboral has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/informacion-laborals")
    public ResponseEntity<InformacionLaboral> createInformacionLaboral(@Valid @RequestBody InformacionLaboral informacionLaboral) throws URISyntaxException {
        log.debug("REST request to save InformacionLaboral : {}", informacionLaboral);
        if (informacionLaboral.getId() != null) {
            throw new BadRequestAlertException("A new informacionLaboral cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InformacionLaboral result = informacionLaboralService.save(informacionLaboral);
        return ResponseEntity.created(new URI("/api/informacion-laborals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /informacion-laborals} : Updates an existing informacionLaboral.
     *
     * @param informacionLaboral the informacionLaboral to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated informacionLaboral,
     * or with status {@code 400 (Bad Request)} if the informacionLaboral is not valid,
     * or with status {@code 500 (Internal Server Error)} if the informacionLaboral couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/informacion-laborals")
    public ResponseEntity<InformacionLaboral> updateInformacionLaboral(@Valid @RequestBody InformacionLaboral informacionLaboral) throws URISyntaxException {
        log.debug("REST request to update InformacionLaboral : {}", informacionLaboral);
        if (informacionLaboral.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InformacionLaboral result = informacionLaboralService.save(informacionLaboral);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, informacionLaboral.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /informacion-laborals} : get all the informacionLaborals.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of informacionLaborals in body.
     */
    @GetMapping("/informacion-laborals")
    public ResponseEntity<List<InformacionLaboral>> getAllInformacionLaborals(InformacionLaboralCriteria criteria, Pageable pageable) {
        log.debug("REST request to get InformacionLaborals by criteria: {}", criteria);
        Page<InformacionLaboral> page = informacionLaboralQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /informacion-laborals/count} : count all the informacionLaborals.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/informacion-laborals/count")
    public ResponseEntity<Long> countInformacionLaborals(InformacionLaboralCriteria criteria) {
        log.debug("REST request to count InformacionLaborals by criteria: {}", criteria);
        return ResponseEntity.ok().body(informacionLaboralQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /informacion-laborals/:id} : get the "id" informacionLaboral.
     *
     * @param id the id of the informacionLaboral to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the informacionLaboral, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/informacion-laborals/{id}")
    public ResponseEntity<InformacionLaboral> getInformacionLaboral(@PathVariable Long id) {
        log.debug("REST request to get InformacionLaboral : {}", id);
        Optional<InformacionLaboral> informacionLaboral = informacionLaboralService.findOne(id);
        return ResponseUtil.wrapOrNotFound(informacionLaboral);
    }

    /**
     * {@code DELETE  /informacion-laborals/:id} : delete the "id" informacionLaboral.
     *
     * @param id the id of the informacionLaboral to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/informacion-laborals/{id}")
    public ResponseEntity<Void> deleteInformacionLaboral(@PathVariable Long id) {
        log.debug("REST request to delete InformacionLaboral : {}", id);
        informacionLaboralService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
