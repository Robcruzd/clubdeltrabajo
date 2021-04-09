package com.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.InformacionAcademica;
import com.repository.InformacionAcademicaRepository;

/**
 * Service Implementation for managing {@link InformacionAcademica}.
 */
@Service
@Transactional
public class InformacionAcademicaService {

    private final Logger log = LoggerFactory.getLogger(InformacionAcademicaService.class);

    private final InformacionAcademicaRepository informacionAcademicaRepository;

    public InformacionAcademicaService(InformacionAcademicaRepository informacionAcademicaRepository) {
        this.informacionAcademicaRepository = informacionAcademicaRepository;
    }

    /**
     * Save a informacionAcademica.
     *
     * @param informacionAcademica the entity to save.
     * @return the persisted entity.
     */
    public InformacionAcademica save(InformacionAcademica informacionAcademica) {
        log.debug("Request to save InformacionAcademica : {}", informacionAcademica);
        return informacionAcademicaRepository.save(informacionAcademica);
    }

    /**
     * Get all the informacionAcademicas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<InformacionAcademica> findAll(Pageable pageable) {
        log.debug("Request to get all InformacionAcademicas");
        return informacionAcademicaRepository.findAll(pageable);
    }

    /**
     * Get one informacionAcademica by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InformacionAcademica> findOne(Long id) {
        log.debug("Request to get InformacionAcademica : {}", id);
        return informacionAcademicaRepository.findById(id);
    }

    /**
     * Delete the informacionAcademica by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InformacionAcademica : {}", id);
        informacionAcademicaRepository.deleteById(id);
    }
    
    public List<InformacionAcademica> getByPersona( Long persona) {
    	return informacionAcademicaRepository.getByPersona(persona);
    }
}
