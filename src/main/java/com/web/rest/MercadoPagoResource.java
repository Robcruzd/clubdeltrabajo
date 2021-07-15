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
import com.mercadopago.exceptions.MPConfException;
import com.mercadopago.exceptions.MPException;

import com.service.MercadoPagoService;
import com.web.rest.errors.BadRequestAlertException;

import com.mercadopago.resources.Preference;

/**
 * REST controller for managing {@link com.domain.Profesion}.
 */
@RestController
@RequestMapping("/api")
public class MercadoPagoResource {

    private final Logger log = LoggerFactory.getLogger(MercadoPagoResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MercadoPagoService mercadoPagoService;

    public MercadoPagoResource(MercadoPagoService mercadoPagoService) {
        this.mercadoPagoService = mercadoPagoService;
    }

    /**
     * {@code POST  /profesions} : Create a new profesion.
     *
     * @param profesion the profesion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profesion, or with status {@code 400 (Bad Request)} if the profesion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mercadoPago")
    public String createMercadoPago(@Valid @RequestBody String prueba) throws URISyntaxException, MPException, MPConfException {
        System.out.println("---probandito---------------------");
        log.debug("Prooooooooobando");
        // Preference result = mercadoPagoService.mercadoPagoCdT();
        
        return "resuuult";
        // if (profesion.getId() != null) {
        //     throw new BadRequestAlertException("A new profesion cannot already have an ID", ENTITY_NAME, "idexists");
        // }
        // Profesion result = profesionService.save(profesion);
        // return ResponseEntity.created(new URI("/api/profesions/" + result.getId()))
        //     .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
        //     .body(result);
    }


    @GetMapping("/mercado-pago")
    public String getMercado() throws URISyntaxException, MPException, MPConfException {
        System.out.println("---probandito---------------------");
        String result = mercadoPagoService.mercadoPagoCdT();
        return "{\"id\": \""+result+"\"}";
    }
    
}
