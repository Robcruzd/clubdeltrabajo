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
import org.springframework.data.domain.Pageable;
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

import com.domain.Persona;
import com.domain.PersonaIdioma;
import com.service.PersonaIdiomaQueryService;
import com.service.PersonaIdiomaService;
import com.service.dto.PersonaIdiomaCriteria;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.domain.PersonaIdioma}.
 */
@RestController
@RequestMapping("/api")
public class PersonaIdiomaResource {

    private final Logger log = LoggerFactory.getLogger(PersonaIdiomaResource.class);

    private static final String ENTITY_NAME = "personaIdioma";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonaIdiomaService personaIdiomaService;

    private final PersonaIdiomaQueryService personaIdiomaQueryService;

    public PersonaIdiomaResource(PersonaIdiomaService personaIdiomaService, PersonaIdiomaQueryService personaIdiomaQueryService) {
        this.personaIdiomaService = personaIdiomaService;
        this.personaIdiomaQueryService = personaIdiomaQueryService;
    }

    /**
     * {@code POST  /persona-idiomas} : Create a new personaIdioma.
     *
     * @param personaIdioma the personaIdioma to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personaIdioma, or with status {@code 400 (Bad Request)} if the personaIdioma has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/persona-idiomas")
    public ResponseEntity<PersonaIdioma> createPersonaIdioma(@Valid @RequestBody PersonaIdioma personaIdioma) throws URISyntaxException {
        log.debug("REST request to save PersonaIdioma : {}", personaIdioma);
        if (personaIdioma.getId() != null) {
            throw new BadRequestAlertException("A new personaIdioma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonaIdioma result = personaIdiomaService.save(personaIdioma);
        return ResponseEntity.created(new URI("/api/persona-idiomas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /persona-idiomas} : Updates an existing personaIdioma.
     *
     * @param personaIdioma the personaIdioma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personaIdioma,
     * or with status {@code 400 (Bad Request)} if the personaIdioma is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personaIdioma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/persona-idiomas")
    public ResponseEntity<PersonaIdioma> updatePersonaIdioma(@Valid @RequestBody PersonaIdioma personaIdioma) throws URISyntaxException {
        log.debug("REST request to update PersonaIdioma : {}", personaIdioma);
        if (personaIdioma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PersonaIdioma result = personaIdiomaService.save(personaIdioma);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personaIdioma.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /persona-idiomas} : get all the personaIdiomas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personaIdiomas in body.
     */
    @GetMapping("/persona-idiomas")
    public ResponseEntity<List<PersonaIdioma>> getAllPersonaIdiomas(PersonaIdiomaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get PersonaIdiomas by criteria: {}", criteria);
        Page<PersonaIdioma> page = personaIdiomaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /persona-idiomas/count} : count all the personaIdiomas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/persona-idiomas/count")
    public ResponseEntity<Long> countPersonaIdiomas(PersonaIdiomaCriteria criteria) {
        log.debug("REST request to count PersonaIdiomas by criteria: {}", criteria);
        return ResponseEntity.ok().body(personaIdiomaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /persona-idiomas/:id} : get the "id" personaIdioma.
     *
     * @param id the id of the personaIdioma to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personaIdioma, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/persona-idiomas/{id}")
    public ResponseEntity<PersonaIdioma> getPersonaIdioma(@PathVariable Long id) {
        log.debug("REST request to get PersonaIdioma : {}", id);
        Optional<PersonaIdioma> personaIdioma = personaIdiomaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(personaIdioma);
    }

    /**
     * {@code DELETE  /persona-idiomas/:id} : delete the "id" personaIdioma.
     *
     * @param id the id of the personaIdioma to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/persona-idiomas/{id}")
    public ResponseEntity<Void> deletePersonaIdioma(@PathVariable Long id) {
        log.debug("REST request to delete PersonaIdioma : {}", id);
        personaIdiomaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/persona-idiomas/filtroByPersona")
	public List<PersonaIdioma> getByPersonaIdioma(@RequestParam("persona") String persona) {
		return personaIdiomaService.getByPersonaIdioma(Long.parseLong(persona));
	}
}
