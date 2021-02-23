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

import com.domain.InformacionAcademica;
import com.domain.*; // for static metamodels
import com.repository.InformacionAcademicaRepository;
import com.service.dto.InformacionAcademicaCriteria;

/**
 * Service for executing complex queries for {@link InformacionAcademica} entities in the database.
 * The main input is a {@link InformacionAcademicaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InformacionAcademica} or a {@link Page} of {@link InformacionAcademica} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InformacionAcademicaQueryService extends QueryService<InformacionAcademica> {

    private final Logger log = LoggerFactory.getLogger(InformacionAcademicaQueryService.class);

    private final InformacionAcademicaRepository informacionAcademicaRepository;

    public InformacionAcademicaQueryService(InformacionAcademicaRepository informacionAcademicaRepository) {
        this.informacionAcademicaRepository = informacionAcademicaRepository;
    }

    /**
     * Return a {@link List} of {@link InformacionAcademica} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InformacionAcademica> findByCriteria(InformacionAcademicaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InformacionAcademica> specification = createSpecification(criteria);
        return informacionAcademicaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InformacionAcademica} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InformacionAcademica> findByCriteria(InformacionAcademicaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InformacionAcademica> specification = createSpecification(criteria);
        return informacionAcademicaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InformacionAcademicaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InformacionAcademica> specification = createSpecification(criteria);
        return informacionAcademicaRepository.count(specification);
    }

    /**
     * Function to convert {@link InformacionAcademicaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InformacionAcademica> createSpecification(InformacionAcademicaCriteria criteria) {
        Specification<InformacionAcademica> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InformacionAcademicaFiltro.id));
            }
            if (criteria.getNivelEstudio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNivelEstudio(), InformacionAcademicaFiltro.nivelEstudio));
            }
            if (criteria.getEstado() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getEstado(), InformacionAcademicaFiltro.estado));
            }
            // if (criteria.getFechaInicio() != null) {
            //     specification = specification.and(buildRangeSpecification(criteria.getFechaInicio(), InformacionAcademica_.fechaInicio));
            // }
            if (criteria.getFechaFin() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaFin(), InformacionAcademicaFiltro.fechaFin));
            }
            if (criteria.getTituloOtorgado() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTituloOtorgado(), InformacionAcademicaFiltro.tituloOtorgado));
            }
            if (criteria.getUsuarioId() != null) {
                specification = specification.and(buildSpecification(criteria.getUsuarioId(),
                    root -> root.join(InformacionAcademicaFiltro.usuario, JoinType.LEFT).get(PersonaFiltro.id)));
            }
            // if (criteria.getInstitucionId() != null) {
            //     specification = specification.and(buildSpecification(criteria.getInstitucionId(),
            //         root -> root.join(InformacionAcademica_.institucion, JoinType.LEFT).get(Institucion_.id)));
            // }
        }
        return specification;
    }
}
