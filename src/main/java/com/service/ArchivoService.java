package com.service;

import com.domain.Archivo;
import com.repository.ArchivoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Archivo}.
 */
@Service
@Transactional
public class ArchivoService {

    private final Logger log = LoggerFactory.getLogger(ArchivoService.class);

    private final ArchivoRepository archivoRepository;

    public ArchivoService(ArchivoRepository archivoRepository) {
        this.archivoRepository = archivoRepository;
    }

    /**
     * Save a archivo.
     *
     * @param archivo the entity to save.
     * @return the persisted entity.
     */
    public Archivo save(Archivo archivo) {
        log.debug("Request to save Archivo : {}", archivo);
        return archivoRepository.save(archivo);
    }

    /**
     * Get all the archivos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Archivo> findAll(Pageable pageable) {
        log.debug("Request to get all Archivos");
        return archivoRepository.findAll(pageable);
    }

    /**
     * Get one archivo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Archivo> findOne(Long id) {
        log.debug("Request to get Archivo : {}", id);
        return archivoRepository.findById(id);
    }

    /**
     * Delete the archivo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Archivo : {}", id);
        archivoRepository.deleteById(id);
    }
}
