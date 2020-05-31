package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.vo.HojaVidaVo;
import com.service.HojaVidaService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api")
public class HojaVidaResource {

	private final Logger log = LoggerFactory.getLogger(IdiomaResource.class);

	private static final String ENTITY_NAME = "hojaVidaVo";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final HojaVidaService service;

	public HojaVidaResource(HojaVidaService service) {
		this.service = service;
	}

	/**
	 * {@code POST  /hoja-vida} : Create a new hoja vida.
	 *
	 * @param hojaVida the hoja vida to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new hoja vida, or with status {@code 400 (Bad Request)} if
	 *         the hoja vida has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/hoja-vida")
	public ResponseEntity<HojaVidaVo> createHojaVida(@Valid @RequestBody HojaVidaVo hojaVida)
			throws URISyntaxException {
		log.debug("REST request to save hoja vida : {}", hojaVida);

		HojaVidaVo result = service.save(hojaVida);
		return ResponseEntity.created(new URI("/api/hoja-vida/" + result.getInformacionPersonal().getUsuario().getId()))
				.headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME,
						result.getInformacionPersonal().getUsuario().getId().toString()))
				.body(result);
	}

	/**
	 * {@code GET  /hoja-vida/:id} : get the "id" persona.
	 *
	 * @param id the id of the persona to retrieve its curriculum.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the hojaVida, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/hoja-vida/{id}")
	public ResponseEntity<HojaVidaVo> get(@PathVariable Long id) {
		log.debug("REST request to get Idioma : {}", id);
		Optional<HojaVidaVo> hojaVida = service.get(id);
		return ResponseUtil.wrapOrNotFound(hojaVida);
	}

	/**
	 * {@code PUT  /hoja-vida/:id} : update the "id" persona.
	 *
	 * @param id the id of the persona to retrieve its curriculum.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the hojaVida, or with status {@code 404 (Not Found)}.
	 */
	@PutMapping("/hoja-vida")
	public ResponseEntity<HojaVidaVo> update(@Valid @RequestBody HojaVidaVo hojaVida) {
		log.debug("REST request to update Hoja de vida : {}");
		HojaVidaVo result = service.save(hojaVida);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
				hojaVida.getInformacionPersonal().getUsuario().getId().toString())).body(result);
	}

}