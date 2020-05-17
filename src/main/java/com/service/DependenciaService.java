package com.service;

import com.domain.Dependencia;
import com.repository.DependenciaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Dependencia}.
 */
@Service
@Transactional
public class DependenciaService {

    private final Logger log = LoggerFactory.getLogger(DependenciaService.class);

    private final DependenciaRepository dependenciaRepository;

    public DependenciaService(DependenciaRepository dependenciaRepository) {
        this.dependenciaRepository = dependenciaRepository;
    }

    /**
     * Save a dependencia.
     *
     * @param dependencia the entity to save.
     * @return the persisted entity.
     */
    public Dependencia save(Dependencia dependencia) {
        log.debug("Request to save Dependencia : {}", dependencia);
        return dependenciaRepository.save(dependencia);
    }

    /**
     * Get all the dependencias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Dependencia> findAll(Pageable pageable) {
        log.debug("Request to get all Dependencias");
        return dependenciaRepository.findAll(pageable);
    }

    /**
     * Get one dependencia by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Dependencia> findOne(Long id) {
        log.debug("Request to get Dependencia : {}", id);
        return dependenciaRepository.findById(id);
    }

    /**
     * Delete the dependencia by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Dependencia : {}", id);
        dependenciaRepository.deleteById(id);
    }
}
