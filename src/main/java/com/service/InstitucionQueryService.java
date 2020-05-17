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

import com.domain.Institucion;
import com.domain.*; // for static metamodels
import com.repository.InstitucionRepository;
import com.service.dto.InstitucionCriteria;

/**
 * Service for executing complex queries for {@link Institucion} entities in the database.
 * The main input is a {@link InstitucionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Institucion} or a {@link Page} of {@link Institucion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InstitucionQueryService extends QueryService<Institucion> {

    private final Logger log = LoggerFactory.getLogger(InstitucionQueryService.class);

    private final InstitucionRepository institucionRepository;

    public InstitucionQueryService(InstitucionRepository institucionRepository) {
        this.institucionRepository = institucionRepository;
    }

    /**
     * Return a {@link List} of {@link Institucion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Institucion> findByCriteria(InstitucionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Institucion> specification = createSpecification(criteria);
        return institucionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Institucion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Institucion> findByCriteria(InstitucionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Institucion> specification = createSpecification(criteria);
        return institucionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InstitucionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Institucion> specification = createSpecification(criteria);
        return institucionRepository.count(specification);
    }

    /**
     * Function to convert {@link InstitucionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Institucion> createSpecification(InstitucionCriteria criteria) {
        Specification<Institucion> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Institucion_.id));
            }
            if (criteria.getInstitucion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getInstitucion(), Institucion_.institucion));
            }
        }
        return specification;
    }
}
