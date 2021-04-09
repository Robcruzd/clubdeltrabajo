package com.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.InformacionLaboral;
import com.repository.InformacionLaboralRepository;

/**
 * Service Implementation for managing {@link InformacionLaboral}.
 */
@Service
@Transactional
public class InformacionLaboralService {

    private final Logger log = LoggerFactory.getLogger(InformacionLaboralService.class);

    private final InformacionLaboralRepository informacionLaboralRepository;

    public InformacionLaboralService(InformacionLaboralRepository informacionLaboralRepository) {
        this.informacionLaboralRepository = informacionLaboralRepository;
    }

    /**
     * Save a informacionLaboral.
     *
     * @param informacionLaboral the entity to save.
     * @return the persisted entity.
     */
    public InformacionLaboral save(InformacionLaboral informacionLaboral) {
        log.debug("Request to save InformacionLaboral : {}", informacionLaboral);
        return informacionLaboralRepository.save(informacionLaboral);
    }

    /**
     * Get all the informacionLaborals.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<InformacionLaboral> findAll(Pageable pageable) {
        log.debug("Request to get all InformacionLaborals");
        return informacionLaboralRepository.findAll(pageable);
    }

    /**
     * Get one informacionLaboral by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InformacionLaboral> findOne(Long id) {
        log.debug("Request to get InformacionLaboral : {}", id);
        return informacionLaboralRepository.findById(id);
    }

    /**
     * Delete the informacionLaboral by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InformacionLaboral : {}", id);
        informacionLaboralRepository.deleteById(id);
    }
    
    public List<InformacionLaboral> getByPersona( Long persona) {
    	return informacionLaboralRepository.getByPersona(persona);
    }
}
