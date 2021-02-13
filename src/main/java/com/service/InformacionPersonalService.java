package com.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.InformacionPersonal;
import com.repository.InformacionPersonalRepository;

/**
 * Service Implementation for managing {@link InformacionPersonal}.
 */
@Service
@Transactional
public class InformacionPersonalService {


    private final Logger log = LoggerFactory.getLogger(InformacionPersonalService.class);

    private final InformacionPersonalRepository informacionPersonalRepository;

    public InformacionPersonalService(InformacionPersonalRepository informacionPersonalRepository) {
        this.informacionPersonalRepository = informacionPersonalRepository;
    }

    /**
     * Save a informacionPersonal.
     *
     * @param informacionPersonal the entity to save.
     * @return the persisted entity.
     */
    public InformacionPersonal save(InformacionPersonal informacionPersonal) {
        log.debug("Request to save InformacionPersonal : {}", informacionPersonal);
        return informacionPersonalRepository.save(informacionPersonal);
    }

    /**
     * Get all the informacionPersonals.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<InformacionPersonal> findAll(Pageable pageable) {
        log.debug("Request to get all InformacionPersonals");
        return informacionPersonalRepository.findAll(pageable);
    }

    /**
     * Get one informacionPersonal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InformacionPersonal> findOne(Long id) {
        log.debug("Request to get InformacionPersonal : {}", id);
        return informacionPersonalRepository.findById(id);
    }

    /**
     * Delete the informacionPersonal by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InformacionPersonal : {}", id);
        informacionPersonalRepository.deleteById(id);
    }
    
}
