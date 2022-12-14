package com.web.rest;

import com.domain.MembresiaEmpresa;
import com.service.MembresiaEmpresaService;
import com.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MembresiaEmpresaResource {

    private final Logger log = LoggerFactory.getLogger(MembresiaEmpresaResource.class);

    private static final String ENTITY_NAME = "membresia empresa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MembresiaEmpresaService membresiaEmpresaService;

    public MembresiaEmpresaResource(MembresiaEmpresaService membresiaEmpresaService) {
        this.membresiaEmpresaService = membresiaEmpresaService;
    }

    @GetMapping("/membresiaEmpresa")
    public Page<MembresiaEmpresa> getAllMembresiaEmpresa() {
        Pageable paging = PageRequest.of(0, 9999, Sort.by("id"));
        return membresiaEmpresaService.findAll(paging);
    }

    @GetMapping("/membresiaEmpresa/filtroByEmpresa")
    public List<MembresiaEmpresa> getByEmpresa(@RequestParam("empresa") String empresa) {
        return membresiaEmpresaService.getByEmpresa(Long.parseLong(empresa));
    }

    @PutMapping("/membresiaEmpresa")
    public ResponseEntity<MembresiaEmpresa> updateMembresia(@Valid @RequestBody MembresiaEmpresa membresiaEmpresa) throws URISyntaxException {
        log.debug("REST request to update membresiaEmpresa : {}", membresiaEmpresa);
        if (membresiaEmpresa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MembresiaEmpresa result = membresiaEmpresaService.save(membresiaEmpresa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, membresiaEmpresa.getId().toString()))
            .body(result);
    }
}
