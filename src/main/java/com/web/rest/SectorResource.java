package com.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Sector;
import com.service.SectorService;

/**
 * REST controller for managing {@link com.domain.TipoDocumento}.
 */
@RestController
@RequestMapping("/api")
public class SectorResource {

    private final Logger log = LoggerFactory.getLogger(SectorResource.class);

    private static final String ENTITY_NAME = "sector";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SectorService sectorService;


    public SectorResource(SectorService sectorService) {
        this.sectorService = sectorService;
    }

    
    @GetMapping("/sector")
    public List<Sector> getSector() {
        return sectorService.findAllSector();
    }

    @GetMapping("/sector/id")
    public List<Sector> getSectorById(@RequestParam("id") String id) {
        return sectorService.findSectorById(Long.parseLong(id));
    }

    
}
