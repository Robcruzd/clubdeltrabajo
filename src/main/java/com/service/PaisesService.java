package com.service;

import com.domain.Paises;
import com.repository.PaisesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Paises}.
 */
@Service
@Transactional
public class PaisesService {

    private final Logger log = LoggerFactory.getLogger(PaisesService.class);

    private final PaisesRepository paisesRepository;

    public PaisesService(PaisesRepository paisesRepository) {
        this.paisesRepository = paisesRepository;
    }

    /**
     * Save a paises.
     *
     * @param paises the entity to save.
     * @return the persisted entity.
     */
    public Paises save(Paises paises) {
        log.debug("Request to save Paises : {}", paises);
        return paisesRepository.save(paises);
    }

    /**
     * Get all the paises.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Paises> findAll(Pageable pageable) {
        log.debug("Request to get all Paises");
        return paisesRepository.findAll(pageable);
    }

    /**
     * Get one paises by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Paises> findOne(Long id) {
        log.debug("Request to get Paises : {}", id);
        return paisesRepository.findById(id);
    }

    /**
     * Delete the paises by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Paises : {}", id);
        paisesRepository.deleteById(id);
    }
}
