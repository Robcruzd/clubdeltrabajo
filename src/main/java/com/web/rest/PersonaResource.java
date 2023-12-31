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

import com.domain.Empresa;
import com.domain.InformacionPersonal;
import com.domain.Oferta;
import com.domain.Persona;
import com.domain.vo.UsuarioVo;
import com.service.PersonaQueryService;
import com.service.PersonaService;
import com.service.UserService;
import com.service.MailService;
import com.service.dto.InformacionPersonalCriteria;
import com.service.dto.PersonaCriteria;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.domain.Persona}.
 */
@RestController
@RequestMapping("/api")
public class PersonaResource {

    private final Logger log = LoggerFactory.getLogger(PersonaResource.class);

    private static final String ENTITY_NAME = "persona";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonaService personaService;

    private final PersonaQueryService personaQueryService;
    
    private final UserService userService;

    private final MailService mailService;

    public PersonaResource(PersonaService personaService, PersonaQueryService personaQueryService, UserService userService, MailService mailService) {
        this.personaService = personaService;
        this.personaQueryService = personaQueryService;
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /personas} : Create a new persona.
     *
     * @param persona the persona to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new persona, or with status {@code 400 (Bad Request)} if the persona has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/personas")
    public ResponseEntity<Persona> createPersona(@Valid @RequestBody Persona persona) throws URISyntaxException {
        log.debug("REST request to save Persona : {}", persona);
        if (persona.getId() != null) {
            throw new BadRequestAlertException("A new persona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Persona result = personaService.save(persona);
        return ResponseEntity.created(new URI("/api/personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    @PostMapping("/personas/user")
    public ResponseEntity<Persona> crearUsuarioPersona(@Valid @RequestBody UsuarioVo usuarioVo) throws URISyntaxException {
        log.debug("REST request to save Persona : {}", usuarioVo);
        if (usuarioVo.getPersona().getId() != null) {
            throw new BadRequestAlertException("A new persona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Persona result = personaService.save(usuarioVo.getPersona());
        usuarioVo.getUsuario().setUser(result.getId());
        userService.registerUser(usuarioVo.getUsuario(), usuarioVo.getUsuario().getPassword());
        return ResponseEntity.created(new URI("/api/personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /personas} : Updates an existing persona.
     *
     * @param persona the persona to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated persona,
     * or with status {@code 400 (Bad Request)} if the persona is not valid,
     * or with status {@code 500 (Internal Server Error)} if the persona couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/personas")
    public ResponseEntity<Persona> updatePersona(@Valid @RequestBody Persona persona) throws URISyntaxException {
        log.debug("REST request to update Persona : {}", persona);
        if (persona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Persona result = personaService.save(persona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, persona.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /personas} : get all the personas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personas in body.
     */
    @GetMapping("/personas")
    public ResponseEntity<List<Persona>> getAllPersonas(PersonaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Personas by criteria: {}", criteria);
        Page<Persona> page = personaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /personas/count} : count all the personas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/personas/count")
    public ResponseEntity<Long> countPersonas(PersonaCriteria criteria) {
        log.debug("REST request to count Personas by criteria: {}", criteria);
        return ResponseEntity.ok().body(personaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /personas/:id} : get the "id" persona.
     *
     * @param id the id of the persona to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the persona, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/personas/{id}")
    public ResponseEntity<Persona> getPersona(@PathVariable Long id) {
        log.debug("REST request to get Persona : {}", id);
        Optional<Persona> persona = personaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(persona);
    }

    /**
     * {@code DELETE  /personas/:id} : delete the "id" persona.
     *
     * @param id the id of the persona to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/personas/{id}")
    public ResponseEntity<Void> deletePersona(@PathVariable Long id) {
        log.debug("REST request to delete Persona : {}", id);
        personaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/personas/contar")
    public Long getPersonaTotales() {
        return personaService.contarPersonas();
    }
    
    @GetMapping("/personas/getPersonas")
    public List<Persona> getPersonas() {
        return personaService.getPersonas();
    }
    
    @GetMapping("/personas/seleccionadoAspirante")
   	public Page<Persona> seleccionadoAspirante(PersonaCriteria personaBuilder) {
       	Pageable paging = PageRequest.of(0, 9999, Sort.by("id"));
       	Page<Persona> informacionAspirante = personaQueryService.findByCriteria(personaBuilder, paging);
       	personaService.seleccionadoAspirante(informacionAspirante.getContent().get(0).getEmail());
       	return null;
   	}
    
    @GetMapping("/personas/enviarEmailAspirante")
	public void enviarEmailAspirante(@RequestParam("persona") Long persona, @RequestParam("mensaje") String mensaje) {
    	Optional<Persona> personaDatos = personaService.findOne(persona);
        mailService.sendSelectionEmail(personaDatos.get().getEmail(), mensaje);
    	// personaService.enviarEmailAspirante(personaDatos.get().getEmail(), mensaje);
	}
    
    
}
