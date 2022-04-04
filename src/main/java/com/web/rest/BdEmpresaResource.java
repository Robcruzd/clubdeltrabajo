package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.domain.BdEmpresa;
import com.domain.Empresa;
import com.domain.Persona;
import com.service.BdEmpresaService;
import com.service.EmpresaService;
import com.service.PersonaService;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;

/**
 * REST controller for managing {@link com.domain.TipoDocumento}.
 */
@RestController
@RequestMapping("/api")
public class BdEmpresaResource {
		
	
	private final Logger log = LoggerFactory.getLogger(CargoResource.class);

    private static final String ENTITY_NAME = "bd-empresa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BdEmpresaService bdEmpresaService;
    private final EmpresaService empresaService;
    private final PersonaService personaService;

    public BdEmpresaResource(BdEmpresaService bdEmpresaService,EmpresaService empresaService, PersonaService personaService) {
        this.bdEmpresaService = bdEmpresaService;
        this.empresaService = empresaService;
        this.personaService = personaService;
    }
    
    @PostMapping("/bd-empresa")
    public ResponseEntity<BdEmpresa> createBdEmpresa(@Valid @RequestBody BdEmpresa bdempresa) throws URISyntaxException {
        log.debug("REST request to save BdEmpresa : {}", bdempresa);
        if (bdempresa.getId() != null) {
            throw new BadRequestAlertException("A new bdempresa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BdEmpresa result = bdEmpresaService.save(bdempresa);
        return ResponseEntity.created(new URI("/api/bd-empresa/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    @GetMapping("/bd-empresa/idEmpresa")
    public List<BdEmpresa> getBdEmpresaByIdEmpresa(@RequestParam("idEmpresa") String idEmpresa) {
    	Optional<Empresa> empresa = empresaService.findOne(Long.parseLong(idEmpresa));
        return bdEmpresaService.getBdEmpresaByIdEmpresa(empresa.get());
    }
    
    @GetMapping("/bd-empresa/datos")
    public List<BdEmpresa> getBdEmpresaByIdUsuarioAndEmpresa(@RequestParam("idUsuario") String idUsuario,@RequestParam("idEmpresa") String idEmpresa) {
    	Optional<Empresa> empresa = empresaService.findOne(Long.parseLong(idEmpresa));
    	Optional<Persona> persona = personaService.findOne(Long.parseLong(idUsuario));
        return bdEmpresaService.getBdEmpresaByIdEmpresaAndUsuario(persona.get(),empresa.get());
    }

    
}
