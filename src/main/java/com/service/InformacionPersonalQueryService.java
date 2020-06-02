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

import com.domain.InformacionPersonal;
import com.domain.*; // for static metamodels
import com.repository.InformacionPersonalRepository;
import com.service.dto.InformacionPersonalCriteria;

/**
 * Service for executing complex queries for {@link InformacionPersonal} entities in the database.
 * The main input is a {@link InformacionPersonalCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InformacionPersonal} or a {@link Page} of {@link InformacionPersonal} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InformacionPersonalQueryService extends QueryService<InformacionPersonal> {

    private final Logger log = LoggerFactory.getLogger(InformacionPersonalQueryService.class);

    private final InformacionPersonalRepository informacionPersonalRepository;

    public InformacionPersonalQueryService(InformacionPersonalRepository informacionPersonalRepository) {
        this.informacionPersonalRepository = informacionPersonalRepository;
    }

    /**
     * Return a {@link List} of {@link InformacionPersonal} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InformacionPersonal> findByCriteria(InformacionPersonalCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InformacionPersonal> specification = createSpecification(criteria);
        return informacionPersonalRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InformacionPersonal} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InformacionPersonal> findByCriteria(InformacionPersonalCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InformacionPersonal> specification = createSpecification(criteria);
        return informacionPersonalRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InformacionPersonalCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InformacionPersonal> specification = createSpecification(criteria);
        return informacionPersonalRepository.count(specification);
    }

    /**
     * Function to convert {@link InformacionPersonalCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InformacionPersonal> createSpecification(InformacionPersonalCriteria criteria) {
        Specification<InformacionPersonal> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InformacionPersonal_.id));
            }
            if (criteria.getFechaNacimiento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaNacimiento(), InformacionPersonal_.fechaNacimiento));
            }
            if (criteria.getLugarNacimiento() != null) {
                specification = specification.and(buildStringSpecification(criteria.getLugarNacimiento(), InformacionPersonal_.lugarNacimiento));
            }
            if (criteria.getDireccionResidencia() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDireccionResidencia(), InformacionPersonal_.direccionResidencia));
            }
            if (criteria.getGenero() != null) {
                specification = specification.and(buildStringSpecification(criteria.getGenero(), InformacionPersonal_.genero));
            }
            if (criteria.getCiudad() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCiudad(), InformacionPersonal_.ciudad));
            }
            if (criteria.getTelefono() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTelefono(), InformacionPersonal_.telefono));
            }
            if (criteria.getDiscapacidad() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDiscapacidad(), InformacionPersonal_.discapacidad));
            }
            if (criteria.getRedesSociales() != null) {
                specification = specification.and(buildStringSpecification(criteria.getRedesSociales(), InformacionPersonal_.redesSociales));
            }
            if (criteria.getLicencenciaConduccion() != null) {
                specification = specification.and(buildSpecification(criteria.getLicencenciaConduccion(), InformacionPersonal_.licencenciaConduccion));
            }
            if (criteria.getPerfilProfesional() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPerfilProfesional(), InformacionPersonal_.perfilProfesional));
            }
            if (criteria.getUsuarioId() != null) {
                specification = specification.and(buildSpecification(criteria.getUsuarioId(),
                    root -> root.join(InformacionPersonal_.usuario, JoinType.LEFT).get(Persona_.id)));
            }
        }
        return specification;
    }
}
