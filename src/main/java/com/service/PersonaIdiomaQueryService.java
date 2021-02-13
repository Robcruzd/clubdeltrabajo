package com.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.domain.PersonaIdioma;
import com.domain.*; // for static metamodels
import com.repository.PersonaIdiomaRepository;
import com.service.dto.PersonaIdiomaCriteria;

/**
 * Service for executing complex queries for {@link PersonaIdioma} entities in the database.
 * The main input is a {@link PersonaIdiomaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PersonaIdioma} or a {@link Page} of {@link PersonaIdioma} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PersonaIdiomaQueryService extends QueryService<PersonaIdioma> {

    private final Logger log = LoggerFactory.getLogger(PersonaIdiomaQueryService.class);

    private final PersonaIdiomaRepository personaIdiomaRepository;

    public PersonaIdiomaQueryService(PersonaIdiomaRepository personaIdiomaRepository) {
        this.personaIdiomaRepository = personaIdiomaRepository;
    }

    /**
     * Return a {@link List} of {@link PersonaIdioma} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PersonaIdioma> findByCriteria(PersonaIdiomaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<PersonaIdioma> specification = createSpecification(criteria);
        return personaIdiomaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link PersonaIdioma} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PersonaIdioma> findByCriteria(PersonaIdiomaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<PersonaIdioma> specification = createSpecification(criteria);
        return personaIdiomaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PersonaIdiomaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<PersonaIdioma> specification = createSpecification(criteria);
        return personaIdiomaRepository.count(specification);
    }

    /**
     * Function to convert {@link PersonaIdiomaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<PersonaIdioma> createSpecification(PersonaIdiomaCriteria criteria) {
        Specification<PersonaIdioma> specification = Specification.where(null);
        if (criteria != null) {
//            if (criteria.getId() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getId(), PersonaIdioma_.id));
//            }
//            if (criteria.getNivel() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getNivel(), PersonaIdioma_.nivel));
//            }
//            if (criteria.getIdPersonaId() != null) {
//                specification = specification.and(buildSpecification(criteria.getIdPersonaId(),
//                    root -> root.join(PersonaIdioma_.idPersona, JoinType.LEFT).get(Persona_.id)));
//            }
//            if (criteria.getIdIdiomaId() != null) {
//                specification = specification.and(buildSpecification(criteria.getIdIdiomaId(),
//                    root -> root.join(PersonaIdioma_.idIdioma, JoinType.LEFT).get(Idioma_.id)));
//            }
        }
        return specification;
    }
}
