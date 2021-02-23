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

import com.domain.Oferta;
import com.domain.*; // for static metamodels
import com.repository.OfertaRepository;
import com.service.dto.OfertaCriteria;

/**
 * Service for executing complex queries for {@link Oferta} entities in the database.
 * The main input is a {@link OfertaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Oferta} or a {@link Page} of {@link Oferta} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class OfertaQueryService extends QueryService<Oferta> {

    private final Logger log = LoggerFactory.getLogger(OfertaQueryService.class);

    private final OfertaRepository ofertaRepository;

    public OfertaQueryService(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    /**
     * Return a {@link List} of {@link Oferta} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Oferta> findByCriteria(OfertaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Oferta> specification = createSpecification(criteria);
        return ofertaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Oferta} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Oferta> findByCriteria(OfertaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Oferta> specification = createSpecification(criteria);
        return ofertaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(OfertaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Oferta> specification = createSpecification(criteria);
        return ofertaRepository.count(specification);
    }

    /**
     * Function to convert {@link OfertaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Oferta> createSpecification(OfertaCriteria criteria) {
        Specification<Oferta> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), OfertaFiltro.id));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), OfertaFiltro.descripcion));
            }
//            if (criteria.getTitulo() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getTitulo(), Oferta_.titulo));
//            }
            if (criteria.getSalario() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSalario(), OfertaFiltro.salario));
            }
            if (criteria.getCargo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCargo(), OfertaFiltro.cargo));
            }
            if (criteria.getExperiencia() != null) {
                specification = specification.and(buildStringSpecification(criteria.getExperiencia(), OfertaFiltro.experiencia));
            }
            if (criteria.getCiudad() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCiudad(), OfertaFiltro.ciudad));
            }
            if (criteria.getArea() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getArea(), OfertaFiltro.area));
            }
            if (criteria.getFechaPublicacion() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaPublicacion(), OfertaFiltro.fechaPublicacion));
            }
            if (criteria.getEstado() != null) {
                specification = specification.and(buildStringSpecification(criteria.getEstado(), OfertaFiltro.estado));
            }
            if (criteria.getUsuarioId() != null) {
                specification = specification.and(buildSpecification(criteria.getUsuarioId(),
                    root -> root.join(OfertaFiltro.usuario, JoinType.LEFT).get(EmpresaFiltro.id)));
            }
        }
        return specification;
    }
}
