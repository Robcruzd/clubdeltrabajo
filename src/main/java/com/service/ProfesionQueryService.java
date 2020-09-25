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

import com.domain.Profesion;
import com.domain.*; // for static metamodels
import com.repository.ProfesionRepository;
import com.service.dto.ProfesionCriteria;

/**
 * Service for executing complex queries for {@link Profesion} entities in the database.
 * The main input is a {@link ProfesionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Profesion} or a {@link Page} of {@link Profesion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ProfesionQueryService extends QueryService<Profesion> {

    private final Logger log = LoggerFactory.getLogger(ProfesionQueryService.class);

    private final ProfesionRepository profesionRepository;

    public ProfesionQueryService(ProfesionRepository profesionRepository) {
        this.profesionRepository = profesionRepository;
    }

    /**
     * Return a {@link List} of {@link Profesion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Profesion> findByCriteria(ProfesionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Profesion> specification = createSpecification(criteria);
        return profesionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Profesion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Profesion> findByCriteria(ProfesionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Profesion> specification = createSpecification(criteria);
        return profesionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ProfesionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Profesion> specification = createSpecification(criteria);
        return profesionRepository.count(specification);
    }

    /**
     * Function to convert {@link ProfesionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Profesion> createSpecification(ProfesionCriteria criteria) {
        Specification<Profesion> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Profesion_.id));
            }
            if (criteria.getProfesion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getProfesion(), Profesion_.profesion));
            }
        }
        return specification;
    }
}
