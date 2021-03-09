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

import com.domain.AplicacionOferta;
import com.service.AplicacionOfertaQueryService;
import com.service.AplicacionOfertaService;
import com.service.dto.AplicacionOfertaCriteria;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.domain.AplicacionOferta}.
 */
@RestController
@RequestMapping("/api")
public class AplicacionOfertaResource {

    private final Logger log = LoggerFactory.getLogger(AplicacionOfertaResource.class);

    private static final String ENTITY_NAME = "aplicacionOferta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AplicacionOfertaService aplicacionOfertaService;

    private final AplicacionOfertaQueryService aplicacionOfertaQueryService;

    public AplicacionOfertaResource(AplicacionOfertaService aplicacionOfertaService, AplicacionOfertaQueryService aplicacionOfertaQueryService) {
        this.aplicacionOfertaService = aplicacionOfertaService;
        this.aplicacionOfertaQueryService = aplicacionOfertaQueryService;
    }

    /**
     * {@code POST  /aplicacion-ofertas} : Create a new aplicacionOferta.
     *
     * @param aplicacionOferta the aplicacionOferta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aplicacionOferta, or with status {@code 400 (Bad Request)} if the aplicacionOferta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/aplicacion-ofertas")
    public ResponseEntity<AplicacionOferta> createAplicacionOferta(@Valid @RequestBody AplicacionOferta aplicacionOferta) throws URISyntaxException {
        log.debug("REST request to save AplicacionOferta : {}", aplicacionOferta);
        if (aplicacionOferta.getId() != null) {
            throw new BadRequestAlertException("A new aplicacionOferta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AplicacionOferta result = aplicacionOfertaService.save(aplicacionOferta);
        return ResponseEntity.created(new URI("/api/aplicacion-ofertas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /aplicacion-ofertas} : Updates an existing aplicacionOferta.
     *
     * @param aplicacionOferta the aplicacionOferta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aplicacionOferta,
     * or with status {@code 400 (Bad Request)} if the aplicacionOferta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aplicacionOferta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/aplicacion-ofertas")
    public ResponseEntity<AplicacionOferta> updateAplicacionOferta(@Valid @RequestBody AplicacionOferta aplicacionOferta) throws URISyntaxException {
        log.debug("REST request to update AplicacionOferta : {}", aplicacionOferta);
        if (aplicacionOferta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AplicacionOferta result = aplicacionOfertaService.save(aplicacionOferta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aplicacionOferta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /aplicacion-ofertas} : get all the aplicacionOfertas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aplicacionOfertas in body.
     */
    @GetMapping("/aplicacion-ofertas")
    public ResponseEntity<List<AplicacionOferta>> getAllAplicacionOfertas(AplicacionOfertaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get AplicacionOfertas by criteria: {}", criteria);
        Page<AplicacionOferta> page = aplicacionOfertaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /aplicacion-ofertas/count} : count all the aplicacionOfertas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/aplicacion-ofertas/count")
    public ResponseEntity<Long> countAplicacionOfertas(AplicacionOfertaCriteria criteria) {
        log.debug("REST request to count AplicacionOfertas by criteria: {}", criteria);
        return ResponseEntity.ok().body(aplicacionOfertaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /aplicacion-ofertas/:id} : get the "id" aplicacionOferta.
     *
     * @param id the id of the aplicacionOferta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aplicacionOferta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/aplicacion-ofertas/{id}")
    public ResponseEntity<AplicacionOferta> getAplicacionOferta(@PathVariable Long id) {
        log.debug("REST request to get AplicacionOferta : {}", id);
        Optional<AplicacionOferta> aplicacionOferta = aplicacionOfertaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aplicacionOferta);
    }

    /**
     * {@code DELETE  /aplicacion-ofertas/:id} : delete the "id" aplicacionOferta.
     *
     * @param id the id of the aplicacionOferta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/aplicacion-ofertas/{id}")
    public ResponseEntity<Void> deleteAplicacionOferta(@PathVariable Long id) {
        log.debug("REST request to delete AplicacionOferta : {}", id);
        aplicacionOfertaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/aplicacion-ofertas/filtroByPersona")
   	public List<AplicacionOferta> getByPersona(@RequestParam("persona") String persona) {
   		return aplicacionOfertaService.getByPersona(Long.parseLong(persona));
   	}
    
    @GetMapping("/aplicacion-ofertas/filtroByOferta")
   	public List<AplicacionOferta> getByOferta(@RequestParam("oferta") String oferta) {
   		return aplicacionOfertaService.getByOferta(Long.parseLong(oferta));
   	}
    
    @GetMapping("/aplicacion-ofertas/aplicacionOferta")
	public Page<AplicacionOferta> listar(AplicacionOfertaCriteria aplicacionOfertaBuilder) {
    	Pageable paging = PageRequest.of(0, 9999, Sort.by("id"));
    	return aplicacionOfertaQueryService.findByCriteria(aplicacionOfertaBuilder, paging);
		//return informacionPersonalVOService.listar(new CommonSpecifications<InformacionPersonalVO>(informacionPersonalBuilder));
	}
    
    @GetMapping("/aplicacion-ofertas/filtroByOfertaAndPersona")
   	public List<AplicacionOferta> getByOfertaAndPersona(@RequestParam("oferta") String oferta, @RequestParam("persona") String persona) {
   		return aplicacionOfertaService.getByOfertaAndPersona(Long.parseLong(oferta), Long.parseLong(persona));
   	}
}
