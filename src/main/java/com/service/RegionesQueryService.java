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

import com.domain.Regiones;
import com.domain.*; // for static metamodels
import com.repository.RegionesRepository;
import com.service.dto.RegionesCriteria;

/**
 * Service for executing complex queries for {@link Regiones} entities in the database.
 * The main input is a {@link RegionesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Regiones} or a {@link Page} of {@link Regiones} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class RegionesQueryService extends QueryService<Regiones> {

    private final Logger log = LoggerFactory.getLogger(RegionesQueryService.class);

    private final RegionesRepository regionesRepository;

    public RegionesQueryService(RegionesRepository regionesRepository) {
        this.regionesRepository = regionesRepository;
    }

    /**
     * Return a {@link List} of {@link Regiones} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Regiones> findByCriteria(RegionesCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Regiones> specification = createSpecification(criteria);
        return regionesRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Regiones} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Regiones> findByCriteria(RegionesCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Regiones> specification = createSpecification(criteria);
        return regionesRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(RegionesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Regiones> specification = createSpecification(criteria);
        return regionesRepository.count(specification);
    }

    /**
     * Function to convert {@link RegionesCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Regiones> createSpecification(RegionesCriteria criteria) {
        Specification<Regiones> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Regiones_.id));
            }
            if (criteria.getRegion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getRegion(), Regiones_.region));
            }
            if (criteria.getCodigoDaneDelDepartamento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCodigoDaneDelDepartamento(), Regiones_.codigoDaneDelDepartamento));
            }
            if (criteria.getDepartamento() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDepartamento(), Regiones_.departamento));
            }
            if (criteria.getCodigoDaneDelMunicipio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCodigoDaneDelMunicipio(), Regiones_.codigoDaneDelMunicipio));
            }
            if (criteria.getMunicipio() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMunicipio(), Regiones_.municipio));
            }
        }
        return specification;
    }
}
