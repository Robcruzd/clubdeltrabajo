package com.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.Empresa;
import com.domain.Oferta;
import com.repository.OfertaRepository;
import com.service.dto.OfertaCriteria;

/**
 * Service Implementation for managing {@link Oferta}.
 */
@Service
@Transactional
public class OfertaService {

    private final Logger log = LoggerFactory.getLogger(OfertaService.class);

    private final OfertaRepository ofertaRepository;

    public OfertaService(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    /**
     * Save a oferta.
     *
     * @param oferta the entity to save.
     * @return the persisted entity.
     */
    public Oferta save(Oferta oferta) {
        log.debug("Request to save Oferta : {}", oferta);
        return ofertaRepository.save(oferta);
    }

    /**
     * Get all the ofertas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Oferta> findAll(Pageable pageable) {
        log.debug("Request to get all Ofertas");
        return ofertaRepository.findAll(pageable);
    }

    /**
     * Get one oferta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Oferta> findOne(Long id) {
        log.debug("Request to get Oferta : {}", id);
        return ofertaRepository.findById(id);
    }

    /**
     * Delete the oferta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Oferta : {}", id);
        ofertaRepository.deleteById(id);
    }
    
    /**
     * Get all the ofertas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Oferta> findOfertasFiltro(OfertaCriteria criteria) {
        log.debug("Request to get all Ofertas");
        return ofertaRepository.findByCiudadAndExperiencia(criteria.getCiudad(),criteria.getExperiencia());
    }
    
    public List<Oferta> getOfertasFiltro( Long salario, Long ciudad) {
    	return ofertaRepository.getOfertasFiltro(salario,ciudad);
    }
    
    public List<Oferta> getOfertasEmpresa( Empresa usuario) {
    	return ofertaRepository.findByUsuarioOrderByFechaPublicacionDesc(usuario);
    }
    
    public List<Oferta> getOfertasFiltroAll( Long salario, Long ciudad, Long fecha) {
    	return ofertaRepository.getOfertasFiltroAll(salario,ciudad,getFechaHora(fecha));
    }
    
    public List<Oferta> getOfertasFiltroFechaSalario( Long salario, Long fecha) {
    	return ofertaRepository.getOfertasFiltroFechaSalario(salario,getFechaHora(fecha));
    }
    
    public List<Oferta> getOfertasFiltroFechaCiudad( Long ciudad, Long fecha) {
    	return ofertaRepository.getOfertasFiltroFechaCiudad(ciudad,getFechaHora(fecha));
    }
    
    public List<Oferta> getOfertasFiltroFecha( Long fecha) {
    	return ofertaRepository.getOfertasFiltroFecha(getFechaHora(fecha));
    }
    
    public Date getFechaHora(Long fecha) {
    	Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
    	Date fechaHora;
    	if(fecha == 1) {
    		calendar.add(calendar.DAY_OF_MONTH, -1);
    		fechaHora = calendar.getTime();
    	}else if(fecha == 2) {
    		calendar.add(calendar.DAY_OF_MONTH, -7);
    		fechaHora = calendar.getTime();
    	}else if(fecha == 3) {
    		calendar.add(calendar.DAY_OF_MONTH, -30);
    		fechaHora = calendar.getTime();
    	}else{
    		calendar.add(calendar.DAY_OF_MONTH, -365);
    		fechaHora = calendar.getTime();
    	}
    	return fechaHora;
    }
    
}
