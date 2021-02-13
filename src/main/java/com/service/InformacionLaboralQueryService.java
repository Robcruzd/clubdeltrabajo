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

import com.domain.InformacionLaboral;
import com.domain.*; // for static metamodels
import com.repository.InformacionLaboralRepository;
import com.service.dto.InformacionLaboralCriteria;

/**
 * Service for executing complex queries for {@link InformacionLaboral} entities in the database.
 * The main input is a {@link InformacionLaboralCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InformacionLaboral} or a {@link Page} of {@link InformacionLaboral} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InformacionLaboralQueryService extends QueryService<InformacionLaboral> {

    private final Logger log = LoggerFactory.getLogger(InformacionLaboralQueryService.class);

    private final InformacionLaboralRepository informacionLaboralRepository;

    public InformacionLaboralQueryService(InformacionLaboralRepository informacionLaboralRepository) {
        this.informacionLaboralRepository = informacionLaboralRepository;
    }

    /**
     * Return a {@link List} of {@link InformacionLaboral} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InformacionLaboral> findByCriteria(InformacionLaboralCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InformacionLaboral> specification = createSpecification(criteria);
        return informacionLaboralRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InformacionLaboral} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InformacionLaboral> findByCriteria(InformacionLaboralCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InformacionLaboral> specification = createSpecification(criteria);
        return informacionLaboralRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InformacionLaboralCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InformacionLaboral> specification = createSpecification(criteria);
        return informacionLaboralRepository.count(specification);
    }

    /**
     * Function to convert {@link InformacionLaboralCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InformacionLaboral> createSpecification(InformacionLaboralCriteria criteria) {
        Specification<InformacionLaboral> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InformacionLaboral_.id));
            }
            if (criteria.getNombreEmpresa() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreEmpresa(), InformacionLaboral_.nombreEmpresa));
            }
            if (criteria.getFechaInicio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaInicio(), InformacionLaboral_.fechaInicio));
            }
            if (criteria.getFechaFin() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaFin(), InformacionLaboral_.fechaFin));
            }
            if (criteria.getDireccion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDireccion(), InformacionLaboral_.direccion));
            }
//            if (criteria.getCiudad() != null) {
//                specification = specification.and(buildRangeSpecification(criteria.getCiudad(), InformacionLaboral_.ciudad));
//            }
            if (criteria.getDepartamento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDepartamento(), InformacionLaboral_.departamento));
            }
//            if (criteria.getPais() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getPais(), InformacionLaboral_.pais));
//            }
            if (criteria.getTelefonoEmpresa() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTelefonoEmpresa(), InformacionLaboral_.telefonoEmpresa));
            }
//            if (criteria.getDependencia() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getDependencia(), InformacionLaboral_.dependencia));
//            }
//            if (criteria.getCiudadExtranjera() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getCiudadExtranjera(), InformacionLaboral_.ciudadExtranjera));
//            }
            if (criteria.getUsuarioId() != null) {
                specification = specification.and(buildSpecification(criteria.getUsuarioId(),
                    root -> root.join(InformacionLaboral_.usuario, JoinType.LEFT).get(Persona_.id)));
            }
            if (criteria.getCargoId() != null) {
                specification = specification.and(buildSpecification(criteria.getCargoId(),
                    root -> root.join(InformacionLaboral_.cargo, JoinType.LEFT).get(Cargo_.id)));
            }
        }
        return specification;
    }
}
