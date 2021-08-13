package com.service;

import com.domain.Pagos;
import com.repository.PagosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Pagos}.
 */
@Service
@Transactional
public class PagosService {

    private final Logger log = LoggerFactory.getLogger(PagosService.class);

    private final PagosRepository pagosRepository;

    public PagosService(PagosRepository pagosRepository) {
        this.pagosRepository = pagosRepository;
    }

    /**
     * Save a pagos.
     *
     * @param pagos the entity to save.
     * @return the persisted entity.
     */
    public Pagos save(Pagos pagos) {
        log.debug("Request to save Pagos : {}", pagos);
        return pagosRepository.save(pagos);
    }

    /**
     * Get all the pagoss.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Pagos> findAll(Pageable pageable) {
        log.debug("Request to get all Pagos");
        return pagosRepository.findAll(pageable);
    }

    /**
     * Get one pagos by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Pagos> findOne(Long id) {
        log.debug("Request to get Pagos : {}", id);
        return pagosRepository.findById(id);
    }

    /**
     * Delete the pagos by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Pagos : {}", id);
        pagosRepository.deleteById(id);
    }
}
