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

import com.domain.Paises;
import com.domain.*; // for static metamodels
import com.repository.PaisesRepository;
import com.service.dto.PaisesCriteria;

/**
 * Service for executing complex queries for {@link Paises} entities in the database.
 * The main input is a {@link PaisesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Paises} or a {@link Page} of {@link Paises} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PaisesQueryService extends QueryService<Paises> {

    private final Logger log = LoggerFactory.getLogger(PaisesQueryService.class);

    private final PaisesRepository paisesRepository;

    public PaisesQueryService(PaisesRepository paisesRepository) {
        this.paisesRepository = paisesRepository;
    }

    /**
     * Return a {@link List} of {@link Paises} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Paises> findByCriteria(PaisesCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Paises> specification = createSpecification(criteria);
        return paisesRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Paises} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Paises> findByCriteria(PaisesCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Paises> specification = createSpecification(criteria);
        return paisesRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PaisesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Paises> specification = createSpecification(criteria);
        return paisesRepository.count(specification);
    }

    /**
     * Function to convert {@link PaisesCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Paises> createSpecification(PaisesCriteria criteria) {
        Specification<Paises> specification = Specification.where(null);
        if (criteria != null) {
//            if (criteria.getId() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getId(), Paises_.id));
//            }
//            if (criteria.getRegion() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getRegion(), Paises_.region));
//            }
//            if (criteria.getCodigoDaneDelDepartamento() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getCodigoDaneDelDepartamento(), Paises_.codigoDaneDelDepartamento));
//            }
//            if (criteria.getDepartamento() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getDepartamento(), Paises_.departamento));
//            }
//            if (criteria.getCodigoDaneDelMunicipio() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getCodigoDaneDelMunicipio(), Paises_.codigoDaneDelMunicipio));
//            }
//            if (criteria.getMunicipio() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getMunicipio(), Paises_.municipio));
//            }
        }
        return specification;
    }
}
