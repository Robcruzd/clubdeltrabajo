package com.service;

import com.domain.Regiones;
import com.repository.RegionesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Regiones}.
 */
@Service
@Transactional
public class RegionesService {

    private final Logger log = LoggerFactory.getLogger(RegionesService.class);

    private final RegionesRepository regionesRepository;

    public RegionesService(RegionesRepository regionesRepository) {
        this.regionesRepository = regionesRepository;
    }

    /**
     * Save a regiones.
     *
     * @param regiones the entity to save.
     * @return the persisted entity.
     */
    public Regiones save(Regiones regiones) {
        log.debug("Request to save Regiones : {}", regiones);
        return regionesRepository.save(regiones);
    }

    /**
     * Get all the regiones.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Regiones> findAll(Pageable pageable) {
        log.debug("Request to get all Regiones");
        return regionesRepository.findAll(pageable);
    }

    /**
     * Get one regiones by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Regiones> findOne(Long id) {
        log.debug("Request to get Regiones : {}", id);
        return regionesRepository.findById(id);
    }

    /**
     * Delete the regiones by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Regiones : {}", id);
        regionesRepository.deleteById(id);
    }

    public Regiones findByCodigoDaneDelMunicipio(Integer codigoDane) {
        return regionesRepository.findByCodigoDaneDelMunicipio(codigoDane);
    }
}
