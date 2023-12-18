package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.domain.vo.InformacionEmpresaVo;
import com.service.MailService;

import io.github.jhipster.web.util.HeaderUtil;

/**
 * REST controller for managing {@link com.domain.vo.InformacionEmpresaVo}.
 */
@RestController
@RequestMapping("/api")
public class InformacionEmpresaResource {

    private final Logger log = LoggerFactory.getLogger(InformacionEmpresaResource.class);
    
    private static final String ENTITY_NAME = "informacionEmpresaVo";
    
    private final MailService mailService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public InformacionEmpresaResource(MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * {@code POST  /informacion-empresa} : Send Informacion Empresa.
     *
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body informacion empresa.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/informacion-empresa")
    public ResponseEntity<InformacionEmpresaVo> sendInformacionEmpresa(@Valid @RequestBody InformacionEmpresaVo informacionEmpresaVo) throws URISyntaxException {
        log.debug("REST request to send informacion empresa : {}", informacionEmpresaVo);
        mailService.sendInformacionEmpresa(informacionEmpresaVo);
        InformacionEmpresaVo result = informacionEmpresaVo;
        return ResponseEntity.created(new URI("/api/informacion-empresa/"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getNombre().toString() + " " + result.getApellidos().toString()))
            .body(result);
    }
}
