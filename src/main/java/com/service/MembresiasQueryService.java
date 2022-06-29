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

import com.domain.Membresia;
import com.domain.*; // for static metamodels
import com.repository.MembresiaRepository;
import com.service.dto.MembresiasCriteria;

/**
 * Service for executing complex queries for {@link Membresias} entities in the database.
 * The main input is a {@link MembresiasCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Membresias} or a {@link Page} of {@link Membresias} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MembresiasQueryService extends QueryService<Membresia> {

    private final Logger log = LoggerFactory.getLogger(MembresiasQueryService.class);

    private final MembresiaRepository membresiasRepository;

    public MembresiasQueryService(MembresiaRepository membresiasRepository) {
        this.membresiasRepository = membresiasRepository;
    }

    /**
     * Return a {@link List} of {@link Membresias} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Membresia> findByCriteria(MembresiasCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Membresia> specification = createSpecification(criteria);
        return membresiasRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Membresias} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Membresia> findByCriteria(MembresiasCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Membresia> specification = createSpecification(criteria);
        return membresiasRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(MembresiasCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Membresia> specification = createSpecification(criteria);
        return membresiasRepository.count(specification);
    }

    /**
     * Function to convert {@link MembresiasCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Membresia> createSpecification(MembresiasCriteria criteria) {
        Specification<Membresia> specification = Specification.where(null);
        if (criteria != null) {
//            if (criteria.getId() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getId(), Membresias_.id));
//            }
//            if (criteria.getRegion() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getRegion(), Membresias_.region));
//            }
//            if (criteria.getCodigoDaneDelDepartamento() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getCodigoDaneDelDepartamento(), Membresias_.codigoDaneDelDepartamento));
//            }
//            if (criteria.getDepartamento() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getDepartamento(), Membresias_.departamento));
//            }
//            if (criteria.getCodigoDaneDelMunicipio() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getCodigoDaneDelMunicipio(), Membresias_.codigoDaneDelMunicipio));
//            }
//            if (criteria.getMunicipio() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getMunicipio(), Membresias_.municipio));
//            }
        }
        return specification;
    }
}
