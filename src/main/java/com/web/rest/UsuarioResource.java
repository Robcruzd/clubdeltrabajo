package com.web.rest;

import com.domain.Usuario;
import com.domain.vo.DatosCaptcha;
import com.service.UsuarioService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.UsuarioCriteria;
import com.service.UsuarioQueryService;

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
 * REST controller for managing {@link com.domain.Usuario}.
 */
@RestController
@RequestMapping("/api")
public class UsuarioResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioResource.class);

    private static final String ENTITY_NAME = "usuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuarioService usuarioService;

    private final UsuarioQueryService usuarioQueryService;

    public UsuarioResource(UsuarioService usuarioService, UsuarioQueryService usuarioQueryService) {
        this.usuarioService = usuarioService;
        this.usuarioQueryService = usuarioQueryService;
    }

    /**
     * {@code POST  /usuarios} : Create a new usuario.
     *
     * @param usuario the usuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuario, or with status {@code 400 (Bad Request)} if the usuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> createUsuario(@Valid @RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to save Usuario : {}", usuario);
        if (usuario.getId() != null) {
            throw new BadRequestAlertException("A new usuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Usuario result = usuarioService.save(usuario);
        return ResponseEntity.created(new URI("/api/usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuarios} : Updates an existing usuario.
     *
     * @param usuario the usuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuario,
     * or with status {@code 400 (Bad Request)} if the usuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/usuarios")
    public ResponseEntity<Usuario> updateUsuario(@Valid @RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to update Usuario : {}", usuario);
        if (usuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Usuario result = usuarioService.save(usuario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, usuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /usuarios} : get all the usuarios.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuarios in body.
     */
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> getAllUsuarios(UsuarioCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Usuarios by criteria: {}", criteria);
        Page<Usuario> page = usuarioQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /usuarios/count} : count all the usuarios.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/usuarios/count")
    public ResponseEntity<Long> countUsuarios(UsuarioCriteria criteria) {
        log.debug("REST request to count Usuarios by criteria: {}", criteria);
        return ResponseEntity.ok().body(usuarioQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /usuarios/:id} : get the "id" usuario.
     *
     * @param id the id of the usuario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable Long id) {
        log.debug("REST request to get Usuario : {}", id);
        Optional<Usuario> usuario = usuarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(usuario);
    }

    /**
     * {@code DELETE  /usuarios/:id} : delete the "id" usuario.
     *
     * @param id the id of the usuario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        log.debug("REST request to delete Usuario : {}", id);
        usuarioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/usuarios/validar-captcha")
    public Boolean validarCaptcha(DatosCaptcha datosCaptcha) {
        return usuarioQueryService.validarCaptcha(datosCaptcha);
    }
}
