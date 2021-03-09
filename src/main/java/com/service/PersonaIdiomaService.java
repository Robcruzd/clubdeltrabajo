package com.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.Oferta;
import com.domain.Persona;
import com.domain.PersonaIdioma;
import com.repository.PersonaIdiomaRepository;

/**
 * Service Implementation for managing {@link PersonaIdioma}.
 */
@Service
@Transactional
public class PersonaIdiomaService {

    private final Logger log = LoggerFactory.getLogger(PersonaIdiomaService.class);

    private final PersonaIdiomaRepository personaIdiomaRepository;

    public PersonaIdiomaService(PersonaIdiomaRepository personaIdiomaRepository) {
        this.personaIdiomaRepository = personaIdiomaRepository;
    }

    /**
     * Save a personaIdioma.
     *
     * @param personaIdioma the entity to save.
     * @return the persisted entity.
     */
    public PersonaIdioma save(PersonaIdioma personaIdioma) {
        log.debug("Request to save PersonaIdioma : {}", personaIdioma);
        return personaIdiomaRepository.save(personaIdioma);
    }

    /**
     * Get all the personaIdiomas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PersonaIdioma> findAll(Pageable pageable) {
        log.debug("Request to get all PersonaIdiomas");
        return personaIdiomaRepository.findAll(pageable);
    }

    /**
     * Get one personaIdioma by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PersonaIdioma> findOne(Long id) {
        log.debug("Request to get PersonaIdioma : {}", id);
        return personaIdiomaRepository.findById(id);
    }

    /**
     * Delete the personaIdioma by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PersonaIdioma : {}", id);
        personaIdiomaRepository.deleteById(id);
    }
    
    public List<PersonaIdioma> getByPersonaIdioma( Long persona) {
    	return personaIdiomaRepository.getByPersonaIdioma(persona);
    }
}
