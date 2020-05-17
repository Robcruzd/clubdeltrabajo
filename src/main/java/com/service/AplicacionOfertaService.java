package com.service;

import com.domain.AplicacionOferta;
import com.repository.AplicacionOfertaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link AplicacionOferta}.
 */
@Service
@Transactional
public class AplicacionOfertaService {

    private final Logger log = LoggerFactory.getLogger(AplicacionOfertaService.class);

    private final AplicacionOfertaRepository aplicacionOfertaRepository;

    public AplicacionOfertaService(AplicacionOfertaRepository aplicacionOfertaRepository) {
        this.aplicacionOfertaRepository = aplicacionOfertaRepository;
    }

    /**
     * Save a aplicacionOferta.
     *
     * @param aplicacionOferta the entity to save.
     * @return the persisted entity.
     */
    public AplicacionOferta save(AplicacionOferta aplicacionOferta) {
        log.debug("Request to save AplicacionOferta : {}", aplicacionOferta);
        return aplicacionOfertaRepository.save(aplicacionOferta);
    }

    /**
     * Get all the aplicacionOfertas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<AplicacionOferta> findAll(Pageable pageable) {
        log.debug("Request to get all AplicacionOfertas");
        return aplicacionOfertaRepository.findAll(pageable);
    }

    /**
     * Get one aplicacionOferta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AplicacionOferta> findOne(Long id) {
        log.debug("Request to get AplicacionOferta : {}", id);
        return aplicacionOfertaRepository.findById(id);
    }

    /**
     * Delete the aplicacionOferta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AplicacionOferta : {}", id);
        aplicacionOfertaRepository.deleteById(id);
    }
}
