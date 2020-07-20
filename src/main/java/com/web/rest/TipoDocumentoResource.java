package com.web.rest;

import com.domain.TipoDocumento;
import com.service.TipoDocumentoService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.TipoDocumentoCriteria;
import com.service.TipoDocumentoQueryService;

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
 * REST controller for managing {@link com.domain.TipoDocumento}.
 */
@RestController
@RequestMapping("/api")
public class TipoDocumentoResource {

    private final Logger log = LoggerFactory.getLogger(TipoDocumentoResource.class);

    private static final String ENTITY_NAME = "tipoDocumento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDocumentoService tipoDocumentoService;

    private final TipoDocumentoQueryService tipoDocumentoQueryService;

    public TipoDocumentoResource(TipoDocumentoService tipoDocumentoService, TipoDocumentoQueryService tipoDocumentoQueryService) {
        this.tipoDocumentoService = tipoDocumentoService;
        this.tipoDocumentoQueryService = tipoDocumentoQueryService;
    }

    /**
     * {@code POST  /tipo-documentos} : Create a new tipoDocumento.
     *
     * @param tipoDocumento the tipoDocumento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDocumento, or with status {@code 400 (Bad Request)} if the tipoDocumento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-documentos")
    public ResponseEntity<TipoDocumento> createTipoDocumento(@Valid @RequestBody TipoDocumento tipoDocumento) throws URISyntaxException {
        log.debug("REST request to save TipoDocumento : {}", tipoDocumento);
        if (tipoDocumento.getId() != null) {
            throw new BadRequestAlertException("A new tipoDocumento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDocumento result = tipoDocumentoService.save(tipoDocumento);
        return ResponseEntity.created(new URI("/api/tipo-documentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-documentos} : Updates an existing tipoDocumento.
     *
     * @param tipoDocumento the tipoDocumento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDocumento,
     * or with status {@code 400 (Bad Request)} if the tipoDocumento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDocumento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-documentos")
    public ResponseEntity<TipoDocumento> updateTipoDocumento(@Valid @RequestBody TipoDocumento tipoDocumento) throws URISyntaxException {
        log.debug("REST request to update TipoDocumento : {}", tipoDocumento);
        if (tipoDocumento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoDocumento result = tipoDocumentoService.save(tipoDocumento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDocumento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-documentos} : get all the tipoDocumentos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDocumentos in body.
     */
    @GetMapping("/tipo-documentos")
    public ResponseEntity<List<TipoDocumento>> getAllTipoDocumentos(TipoDocumentoCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TipoDocumentos by criteria: {}", criteria);
        Page<TipoDocumento> page = tipoDocumentoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tipo-documentos/count} : count all the tipoDocumentos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/tipo-documentos/count")
    public ResponseEntity<Long> countTipoDocumentos(TipoDocumentoCriteria criteria) {
        log.debug("REST request to count TipoDocumentos by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoDocumentoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tipo-documentos/:id} : get the "id" tipoDocumento.
     *
     * @param id the id of the tipoDocumento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDocumento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-documentos/{id}")
    public ResponseEntity<TipoDocumento> getTipoDocumento(@PathVariable Long id) {
        log.debug("REST request to get TipoDocumento : {}", id);
        Optional<TipoDocumento> tipoDocumento = tipoDocumentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoDocumento);
    }

    /**
     * {@code DELETE  /tipo-documentos/:id} : delete the "id" tipoDocumento.
     *
     * @param id the id of the tipoDocumento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-documentos/{id}")
    public ResponseEntity<Void> deleteTipoDocumento(@PathVariable Long id) {
        log.debug("REST request to delete TipoDocumento : {}", id);
        tipoDocumentoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
}
