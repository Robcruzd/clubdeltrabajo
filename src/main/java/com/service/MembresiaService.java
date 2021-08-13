package com.service;

import com.domain.Membresia;
import com.repository.MembresiaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Membresia}.
 */
@Service
@Transactional
public class MembresiaService {

    private final Logger log = LoggerFactory.getLogger(MembresiaService.class);

    private final MembresiaRepository membresiaRepository;

    public MembresiaService(MembresiaRepository membresiaRepository) {
        this.membresiaRepository = membresiaRepository;
    }

    /**
     * Save a membresia.
     *
     * @param membresia the entity to save.
     * @return the persisted entity.
     */
    public Membresia save(Membresia membresia) {
        log.debug("Request to save Membresia : {}", membresia);
        return membresiaRepository.save(membresia);
    }

    /**
     * Get all the membresias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Membresia> findAll(Pageable pageable) {
        log.debug("Request to get all Membresias");
        return membresiaRepository.findAll(pageable);
    }

    /**
     * Get one membresia by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Membresia> findOne(Long id) {
        log.debug("Request to get Membresia : {}", id);
        return membresiaRepository.findById(id);
    }

    /**
     * Delete the membresia by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Membresia : {}", id);
        membresiaRepository.deleteById(id);
    }
}
