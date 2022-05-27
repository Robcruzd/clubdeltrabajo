package com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
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

import com.domain.AplicacionOferta;
import com.domain.Empresa;
import com.domain.InformacionPersonal;
import com.domain.Oferta;
import com.service.AplicacionOfertaService;
import com.domain.Persona;
import com.domain.Profesion;
import com.service.InformacionPersonalService;
import com.service.OfertaQueryService;
import com.service.OfertaService;
import com.service.ProfesionService;
import com.service.dto.OfertaCriteria;
import com.service.dto.PersonaCriteria;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.domain.Oferta}.
 */
@RestController
@RequestMapping("/api")
public class OfertaResource {

    private final Logger log = LoggerFactory.getLogger(OfertaResource.class);

    private static final String ENTITY_NAME = "oferta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OfertaService ofertaService;

    private final OfertaQueryService ofertaQueryService;
    
    private final AplicacionOfertaService aplicacionOfertaservice;
    
    private final InformacionPersonalService informacionPersonaService;
    
    private final ProfesionService profesionService;

    public OfertaResource(OfertaService ofertaService, OfertaQueryService ofertaQueryService, AplicacionOfertaService aplicacionOfertaservice, InformacionPersonalService informacionPersonaService, ProfesionService profesionService) {
        this.ofertaService = ofertaService;
        this.ofertaQueryService = ofertaQueryService;
        this.aplicacionOfertaservice = aplicacionOfertaservice;
        this.informacionPersonaService = informacionPersonaService;
        this.profesionService = profesionService;
    }
    		

    /**
     * {@code POST  /ofertas} : Create a new oferta.
     *
     * @param oferta the oferta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oferta, or with status {@code 400 (Bad Request)} if the oferta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ofertas")
    public ResponseEntity<Oferta> createOferta(@Valid @RequestBody Oferta oferta) throws URISyntaxException {
        log.debug("REST request to save Oferta : {}", oferta);
        if (oferta.getId() != null) {
            throw new BadRequestAlertException("A new oferta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Oferta result = ofertaService.save(oferta);
        List<InformacionPersonal> listaInfo = new ArrayList<InformacionPersonal>();
	    Profesion profesion = profesionService.getById(result.getProfesion());
		listaInfo = informacionPersonaService.findByProfesion(profesion);
		for(int i=0; i<listaInfo.size() ; i++) {
			ofertaService.enviarEmailPersonas(listaInfo.get(i).getUsuario().getEmail());
		}  
        return ResponseEntity.created(new URI("/api/ofertas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ofertas} : Updates an existing oferta.
     *
     * @param oferta the oferta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oferta,
     * or with status {@code 400 (Bad Request)} if the oferta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oferta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ofertas")
    public ResponseEntity<Oferta> updateOferta(@Valid @RequestBody Oferta oferta) throws URISyntaxException {
        log.debug("REST request to update Oferta : {}", oferta);
        if (oferta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Oferta result = ofertaService.save(oferta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oferta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ofertas} : get all the ofertas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ofertas in body.
     */
    @GetMapping("/ofertas")
    public ResponseEntity<List<Oferta>> getAllOfertas(OfertaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Ofertas by criteria: {}", criteria);
        Page<Oferta> page = ofertaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ofertas/count} : count all the ofertas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/ofertas/count")
    public ResponseEntity<Long> countOfertas(OfertaCriteria criteria) {
        log.debug("REST request to count Ofertas by criteria: {}", criteria);
        return ResponseEntity.ok().body(ofertaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /ofertas/:id} : get the "id" oferta.
     *
     * @param id the id of the oferta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oferta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> getOferta(@PathVariable Long id) {
        log.debug("REST request to get Oferta : {}", id);
        Optional<Oferta> oferta = ofertaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(oferta);
    }

    /**
     * {@code DELETE  /ofertas/:id} : delete the "id" oferta.
     *
     * @param id the id of the oferta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ofertas/{id}")
    public ResponseEntity<Void> deleteOferta(@PathVariable Long id) {
        log.debug("REST request to delete Oferta : {}", id);
        ofertaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    /**
     * {@code GET  /ofertas} : get all the ofertas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ofertas in body.
     */
    
	@GetMapping("/ofertas/filtroOfertas")
	public List<Oferta> getOfertasFiltro(@RequestParam("salario") Long salario,
			@RequestParam("ciudad") Long ciudad, @RequestParam("fecha") Long fecha) {
		if(salario != 0 && ciudad != 0 && fecha != 0) {
			return ofertaService.getOfertasFiltroAll(salario, ciudad, fecha);
		}
		else if(salario != 0 && ciudad == 0 && fecha != 0) {
			return ofertaService.getOfertasFiltroFechaSalario(salario, fecha);		
		}
		else if(salario == 0 && ciudad != 0 && fecha != 0) {
			return ofertaService.getOfertasFiltroFechaCiudad(ciudad, fecha);
		}else {
			return ofertaService.getOfertasFiltroFecha(fecha);
		}
		
	}
	
	@GetMapping("/ofertas/filtroOfertasProfesion")
	public List<Oferta> getOfertasFiltroProfesion(@RequestParam("salario") Long salario,
			@RequestParam("ciudad") Long ciudad, @RequestParam("fecha") Long fecha, @RequestParam("profesion") Long profesion) {
		if(salario != 0 && ciudad != 0 && fecha != 0) {
			return ofertaService.getOfertasFiltroAllProfesion(salario, ciudad, fecha,profesion);
		}
		else if(salario != 0 && ciudad == 0 && fecha != 0) {
			return ofertaService.getOfertasFiltroFechaSalarioProfesion(salario, fecha, profesion);		
		}
		else if(salario == 0 && ciudad != 0 && fecha != 0) {
			return ofertaService.getOfertasFiltroFechaCiudadProfesion(ciudad, fecha, profesion);
		}else {
			return ofertaService.getOfertasFiltroFechaProfesion(fecha, profesion);
		}
		
	}
	
	@GetMapping("/ofertas/filtroOfertasEmpresa")
	public List<Oferta> getOfertasEmpresa(@RequestParam("usuario") Long usuario) {
		Empresa empresa = new Empresa();
		empresa.setId(usuario);
		return ofertaService.getOfertasEmpresa(empresa);
	}
	
	 @GetMapping("/ofertas/obtenerOfertas")
	public Page<Oferta> listar(OfertaCriteria ofertaBuilder) {
    	Pageable paging = PageRequest.of(0, 9999, Sort.by("id"));
    	return ofertaQueryService.findByCriteria(ofertaBuilder, paging);
	}
	 	
	@GetMapping("/ofertas/eliminarOFertas")
	public void eliminarOferta(@RequestParam("oferta") Long oferta) {
		List<AplicacionOferta> listaAplicacionOferta = aplicacionOfertaservice.getByOferta(oferta);
		  if(listaAplicacionOferta.size() == 0) {
			 ofertaService.delete(oferta);
		  }
		  else {
			  for (int i = 0; i < listaAplicacionOferta.size(); i++) {
				  aplicacionOfertaservice.delete(listaAplicacionOferta.get(i).getId());
			  }
			  ofertaService.delete(oferta);
		  }
	}
}
