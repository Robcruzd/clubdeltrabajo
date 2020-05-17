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

import com.domain.Dependencia;
import com.domain.*; // for static metamodels
import com.repository.DependenciaRepository;
import com.service.dto.DependenciaCriteria;

/**
 * Service for executing complex queries for {@link Dependencia} entities in the database.
 * The main input is a {@link DependenciaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Dependencia} or a {@link Page} of {@link Dependencia} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DependenciaQueryService extends QueryService<Dependencia> {

    private final Logger log = LoggerFactory.getLogger(DependenciaQueryService.class);

    private final DependenciaRepository dependenciaRepository;

    public DependenciaQueryService(DependenciaRepository dependenciaRepository) {
        this.dependenciaRepository = dependenciaRepository;
    }

    /**
     * Return a {@link List} of {@link Dependencia} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Dependencia> findByCriteria(DependenciaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Dependencia> specification = createSpecification(criteria);
        return dependenciaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Dependencia} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Dependencia> findByCriteria(DependenciaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Dependencia> specification = createSpecification(criteria);
        return dependenciaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DependenciaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Dependencia> specification = createSpecification(criteria);
        return dependenciaRepository.count(specification);
    }

    /**
     * Function to convert {@link DependenciaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Dependencia> createSpecification(DependenciaCriteria criteria) {
        Specification<Dependencia> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Dependencia_.id));
            }
            if (criteria.getDependencia() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDependencia(), Dependencia_.dependencia));
            }
        }
        return specification;
    }
}
