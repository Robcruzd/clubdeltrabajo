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

import com.domain.Idioma;
import com.domain.*; // for static metamodels
import com.repository.IdiomaRepository;
import com.service.dto.IdiomaCriteria;

/**
 * Service for executing complex queries for {@link Idioma} entities in the database.
 * The main input is a {@link IdiomaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Idioma} or a {@link Page} of {@link Idioma} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class IdiomaQueryService extends QueryService<Idioma> {

    private final Logger log = LoggerFactory.getLogger(IdiomaQueryService.class);

    private final IdiomaRepository idiomaRepository;

    public IdiomaQueryService(IdiomaRepository idiomaRepository) {
        this.idiomaRepository = idiomaRepository;
    }

    /**
     * Return a {@link List} of {@link Idioma} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Idioma> findByCriteria(IdiomaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Idioma> specification = createSpecification(criteria);
        return idiomaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Idioma} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Idioma> findByCriteria(IdiomaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Idioma> specification = createSpecification(criteria);
        return idiomaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(IdiomaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Idioma> specification = createSpecification(criteria);
        return idiomaRepository.count(specification);
    }

    /**
     * Function to convert {@link IdiomaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Idioma> createSpecification(IdiomaCriteria criteria) {
        Specification<Idioma> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), IdiomaFiltro.id));
            }
            if (criteria.getIdioma() != null) {
                specification = specification.and(buildStringSpecification(criteria.getIdioma(), IdiomaFiltro.idioma));
            }
        }
        return specification;
    }
}
