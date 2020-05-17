package com.service;

import com.domain.Idioma;
import com.repository.IdiomaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Idioma}.
 */
@Service
@Transactional
public class IdiomaService {

    private final Logger log = LoggerFactory.getLogger(IdiomaService.class);

    private final IdiomaRepository idiomaRepository;

    public IdiomaService(IdiomaRepository idiomaRepository) {
        this.idiomaRepository = idiomaRepository;
    }

    /**
     * Save a idioma.
     *
     * @param idioma the entity to save.
     * @return the persisted entity.
     */
    public Idioma save(Idioma idioma) {
        log.debug("Request to save Idioma : {}", idioma);
        return idiomaRepository.save(idioma);
    }

    /**
     * Get all the idiomas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Idioma> findAll(Pageable pageable) {
        log.debug("Request to get all Idiomas");
        return idiomaRepository.findAll(pageable);
    }

    /**
     * Get one idioma by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Idioma> findOne(Long id) {
        log.debug("Request to get Idioma : {}", id);
        return idiomaRepository.findById(id);
    }

    /**
     * Delete the idioma by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Idioma : {}", id);
        idiomaRepository.deleteById(id);
    }
}
