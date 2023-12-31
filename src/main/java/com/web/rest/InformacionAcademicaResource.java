package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.domain.InformacionAcademica;
import com.service.InformacionAcademicaQueryService;
import com.service.InformacionAcademicaService;
import com.service.dto.InformacionAcademicaCriteria;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.domain.InformacionAcademica}.
 */
@RestController
@RequestMapping("/api")
public class InformacionAcademicaResource {

    private final Logger log = LoggerFactory.getLogger(InformacionAcademicaResource.class);

    private static final String ENTITY_NAME = "informacionAcademica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InformacionAcademicaService informacionAcademicaService;

    private final InformacionAcademicaQueryService informacionAcademicaQueryService;

    public InformacionAcademicaResource(InformacionAcademicaService informacionAcademicaService, InformacionAcademicaQueryService informacionAcademicaQueryService) {
        this.informacionAcademicaService = informacionAcademicaService;
        this.informacionAcademicaQueryService = informacionAcademicaQueryService;
    }

    /**
     * {@code POST  /informacion-academicas} : Create a new informacionAcademica.
     *
     * @param informacionAcademica the informacionAcademica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new informacionAcademica, or with status {@code 400 (Bad Request)} if the informacionAcademica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/informacion-academicas")
    public ResponseEntity<InformacionAcademica> createInformacionAcademica(@Valid @RequestBody InformacionAcademica informacionAcademica) throws URISyntaxException {
        log.debug("REST request to save InformacionAcademica : {}", informacionAcademica);
        if (informacionAcademica.getId() != null) {
            throw new BadRequestAlertException("A new informacionAcademica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InformacionAcademica result = informacionAcademicaService.save(informacionAcademica);
        return ResponseEntity.created(new URI("/api/informacion-academicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /informacion-academicas} : Updates an existing informacionAcademica.
     *
     * @param informacionAcademica the informacionAcademica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated informacionAcademica,
     * or with status {@code 400 (Bad Request)} if the informacionAcademica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the informacionAcademica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/informacion-academicas")
    public ResponseEntity<InformacionAcademica> updateInformacionAcademica(@Valid @RequestBody InformacionAcademica informacionAcademica) throws URISyntaxException {
        log.debug("REST request to update InformacionAcademica : {}", informacionAcademica);
        if (informacionAcademica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InformacionAcademica result = informacionAcademicaService.save(informacionAcademica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, informacionAcademica.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /informacion-academicas} : get all the informacionAcademicas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of informacionAcademicas in body.
     */
    @GetMapping("/informacion-academicas")
    public ResponseEntity<List<InformacionAcademica>> getAllInformacionAcademicas(InformacionAcademicaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get InformacionAcademicas by criteria: {}", criteria);
        Page<InformacionAcademica> page = informacionAcademicaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /informacion-academicas/count} : count all the informacionAcademicas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/informacion-academicas/count")
    public ResponseEntity<Long> countInformacionAcademicas(InformacionAcademicaCriteria criteria) {
        log.debug("REST request to count InformacionAcademicas by criteria: {}", criteria);
        return ResponseEntity.ok().body(informacionAcademicaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /informacion-academicas/:id} : get the "id" informacionAcademica.
     *
     * @param id the id of the informacionAcademica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the informacionAcademica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/informacion-academicas/{id}")
    public ResponseEntity<InformacionAcademica> getInformacionAcademica(@PathVariable Long id) {
        log.debug("REST request to get InformacionAcademica : {}", id);
        Optional<InformacionAcademica> informacionAcademica = informacionAcademicaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(informacionAcademica);
    }

    /**
     * {@code DELETE  /informacion-academicas/:id} : delete the "id" informacionAcademica.
     *
     * @param id the id of the informacionAcademica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/informacion-academicas/{id}")
    public ResponseEntity<Void> deleteInformacionAcademica(@PathVariable Long id) {
        log.debug("REST request to delete InformacionAcademica : {}", id);
        informacionAcademicaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/informacion-academicas/informacionAcademica")
	public Page<InformacionAcademica> listar(InformacionAcademicaCriteria informacionAcademicaBuilder) {
    	Pageable paging = PageRequest.of(0, 9999, Sort.by("id"));
    	return informacionAcademicaQueryService.findByCriteria(informacionAcademicaBuilder, paging);
		//return informacionPersonalVOService.listar(new CommonSpecifications<InformacionPersonalVO>(informacionPersonalBuilder));
	}
    
    @GetMapping("/informacion-academicas/obtenerInfoUsuario")
   	public List<InformacionAcademica> getByPersona(@RequestParam("persona") String persona) {
   		return informacionAcademicaService.getByPersona(Long.parseLong(persona));
   	}
}
