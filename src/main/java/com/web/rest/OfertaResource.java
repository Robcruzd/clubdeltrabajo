package com.web.rest;

import com.domain.Oferta;
import com.service.OfertaService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.OfertaCriteria;
import com.service.OfertaQueryService;

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

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.domain.Oferta}.
 */
@RestController
@RequestMapping("/api")
public class OfertaResource {

    private final Logger log = LoggerFactory.getLogger(OfertaResource.class);

    private static final String ENTITY_NAME = "oferta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OfertaService ofertaService;

    private final OfertaQueryService ofertaQueryService;

    public OfertaResource(OfertaService ofertaService, OfertaQueryService ofertaQueryService) {
        this.ofertaService = ofertaService;
        this.ofertaQueryService = ofertaQueryService;
    }

    /**
     * {@code POST  /ofertas} : Create a new oferta.
     *
     * @param oferta the oferta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oferta, or with status {@code 400 (Bad Request)} if the oferta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ofertas")
    public ResponseEntity<Oferta> createOferta(@Valid @RequestBody Oferta oferta) throws URISyntaxException {
        log.debug("REST request to save Oferta : {}", oferta);
        if (oferta.getId() != null) {
            throw new BadRequestAlertException("A new oferta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Oferta result = ofertaService.save(oferta);
        return ResponseEntity.created(new URI("/api/ofertas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ofertas} : Updates an existing oferta.
     *
     * @param oferta the oferta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oferta,
     * or with status {@code 400 (Bad Request)} if the oferta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oferta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ofertas")
    public ResponseEntity<Oferta> updateOferta(@Valid @RequestBody Oferta oferta) throws URISyntaxException {
        log.debug("REST request to update Oferta : {}", oferta);
        if (oferta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Oferta result = ofertaService.save(oferta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oferta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ofertas} : get all the ofertas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ofertas in body.
     */
    @GetMapping("/ofertas")
    public ResponseEntity<List<Oferta>> getAllOfertas(OfertaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Ofertas by criteria: {}", criteria);
        Page<Oferta> page = ofertaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ofertas/count} : count all the ofertas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/ofertas/count")
    public ResponseEntity<Long> countOfertas(OfertaCriteria criteria) {
        log.debug("REST request to count Ofertas by criteria: {}", criteria);
        return ResponseEntity.ok().body(ofertaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /ofertas/:id} : get the "id" oferta.
     *
     * @param id the id of the oferta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oferta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> getOferta(@PathVariable Long id) {
        log.debug("REST request to get Oferta : {}", id);
        Optional<Oferta> oferta = ofertaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(oferta);
    }

    /**
     * {@code DELETE  /ofertas/:id} : delete the "id" oferta.
     *
     * @param id the id of the oferta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ofertas/{id}")
    public ResponseEntity<Void> deleteOferta(@PathVariable Long id) {
        log.debug("REST request to delete Oferta : {}", id);
        ofertaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    /**
     * {@code GET  /ofertas} : get all the ofertas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ofertas in body.
     */
    @GetMapping("/ofertas/filtroOfertas")
    public List<Oferta> getOfertasFiltro(@RequestParam OfertaCriteria criteria) throws IOException{
        log.debug("REST request to get Ofertas by criteria: {}", criteria);
        return ofertaService.findOfertasFiltro(criteria);
    }
}
