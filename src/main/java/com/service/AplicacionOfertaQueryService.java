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

import com.domain.AplicacionOferta;
import com.domain.*; // for static metamodels
import com.repository.AplicacionOfertaRepository;
import com.service.dto.AplicacionOfertaCriteria;

/**
 * Service for executing complex queries for {@link AplicacionOferta} entities in the database.
 * The main input is a {@link AplicacionOfertaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AplicacionOferta} or a {@link Page} of {@link AplicacionOferta} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AplicacionOfertaQueryService extends QueryService<AplicacionOferta> {

    private final Logger log = LoggerFactory.getLogger(AplicacionOfertaQueryService.class);

    private final AplicacionOfertaRepository aplicacionOfertaRepository;

    public AplicacionOfertaQueryService(AplicacionOfertaRepository aplicacionOfertaRepository) {
        this.aplicacionOfertaRepository = aplicacionOfertaRepository;
    }

    /**
     * Return a {@link List} of {@link AplicacionOferta} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AplicacionOferta> findByCriteria(AplicacionOfertaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AplicacionOferta> specification = createSpecification(criteria);
        return aplicacionOfertaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link AplicacionOferta} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AplicacionOferta> findByCriteria(AplicacionOfertaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AplicacionOferta> specification = createSpecification(criteria);
        return aplicacionOfertaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AplicacionOfertaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AplicacionOferta> specification = createSpecification(criteria);
        return aplicacionOfertaRepository.count(specification);
    }

    /**
     * Function to convert {@link AplicacionOfertaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AplicacionOferta> createSpecification(AplicacionOfertaCriteria criteria) {
        Specification<AplicacionOferta> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AplicacionOferta_.id));
            }
            if (criteria.getUsuarioId() != null) {
                specification = specification.and(buildSpecification(criteria.getUsuarioId(),
                    root -> root.join(AplicacionOferta_.usuario, JoinType.LEFT).get(Persona_.id)));
            }
            if (criteria.getOfertaId() != null) {
                specification = specification.and(buildSpecification(criteria.getOfertaId(),
                    root -> root.join(AplicacionOferta_.oferta, JoinType.LEFT).get(Oferta_.id)));
            }
        }
        return specification;
    }
}
