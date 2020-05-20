package com.service;

import com.domain.NivelIdioma;
import com.repository.NivelIdiomaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link NivelIdioma}.
 */
@Service
@Transactional
public class NivelIdiomaService {

    private final Logger log = LoggerFactory.getLogger(NivelIdiomaService.class);

    private final NivelIdiomaRepository nivelIdiomaRepository;

    public NivelIdiomaService(NivelIdiomaRepository nivelIdiomaRepository) {
        this.nivelIdiomaRepository = nivelIdiomaRepository;
    }

    /**
     * Save a nivelIdioma.
     *
     * @param nivelIdioma the entity to save.
     * @return the persisted entity.
     */
    public NivelIdioma save(NivelIdioma nivelIdioma) {
        log.debug("Request to save NivelIdioma : {}", nivelIdioma);
        return nivelIdiomaRepository.save(nivelIdioma);
    }

    /**
     * Get all the nivelIdiomas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<NivelIdioma> findAll(Pageable pageable) {
        log.debug("Request to get all NivelIdiomas");
        return nivelIdiomaRepository.findAll(pageable);
    }

    /**
     * Get one nivelIdioma by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NivelIdioma> findOne(Long id) {
        log.debug("Request to get NivelIdioma : {}", id);
        return nivelIdiomaRepository.findById(id);
    }

    /**
     * Delete the nivelIdioma by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete NivelIdioma : {}", id);
        nivelIdiomaRepository.deleteById(id);
    }
}
