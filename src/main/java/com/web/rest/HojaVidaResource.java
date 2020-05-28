package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import com.domain.vo.HojaVidaVo;
import com.service.HojaVidaService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;

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
     *         body the new hoja vida, or with status {@code 400 (Bad Request)} if the
     *         hoja vida has already an ID.
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
}