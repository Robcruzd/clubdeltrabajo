package com.service;

import com.domain.Institucion;
import com.repository.InstitucionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Institucion}.
 */
@Service
@Transactional
public class InstitucionService {

    private final Logger log = LoggerFactory.getLogger(InstitucionService.class);

    private final InstitucionRepository institucionRepository;

    public InstitucionService(InstitucionRepository institucionRepository) {
        this.institucionRepository = institucionRepository;
    }

    /**
     * Save a institucion.
     *
     * @param institucion the entity to save.
     * @return the persisted entity.
     */
    public Institucion save(Institucion institucion) {
        log.debug("Request to save Institucion : {}", institucion);
        return institucionRepository.save(institucion);
    }

    /**
     * Get all the institucions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Institucion> findAll(Pageable pageable) {
        log.debug("Request to get all Institucions");
        return institucionRepository.findAll(pageable);
    }

    /**
     * Get one institucion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Institucion> findOne(Long id) {
        log.debug("Request to get Institucion : {}", id);
        return institucionRepository.findById(id);
    }

    /**
     * Delete the institucion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Institucion : {}", id);
        institucionRepository.deleteById(id);
    }
}
