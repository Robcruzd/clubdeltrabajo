package com.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.Profesion;
import com.repository.ProfesionRepository;

/**
 * Service Implementation for managing {@link Profesion}.
 */
@Service
@Transactional
public class ProfesionService {

    private final Logger log = LoggerFactory.getLogger(ProfesionService.class);

    private final ProfesionRepository profesionRepository;

    public ProfesionService(ProfesionRepository profesionRepository) {
        this.profesionRepository = profesionRepository;
    }

    /**
     * Save a profesion.
     *
     * @param profesion the entity to save.
     * @return the persisted entity.
     */
    public Profesion save(Profesion profesion) {
        log.debug("Request to save Profesion : {}", profesion);
        return profesionRepository.save(profesion);
    }

    /**
     * Get all the profesions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Profesion> findAll(Pageable pageable) {
        log.debug("Request to get all Profesions");
        return profesionRepository.findAll(pageable);
    }

    /**
     * Get one profesion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Profesion> findOne(Long id) {
        log.debug("Request to get Profesion : {}", id);
        return profesionRepository.findById(id);
    }

    /**
     * Delete the profesion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Profesion : {}", id);
        profesionRepository.deleteById(id);
    }
    
    public List<Profesion> getByProfesionFiltro2(String profesion) {
    	return profesionRepository.findByProfesionContainingIgnoreCase(profesion);
    }
    
    public Profesion getById(Long profesion) {
    	return profesionRepository.findByIdQuery(profesion);
    }

    public List<Profesion> getByProfesionFiltro(String profesion) {
    	return profesionRepository.findByProfesionLikeUsingQueryAnnotation(profesion);
    }
}
