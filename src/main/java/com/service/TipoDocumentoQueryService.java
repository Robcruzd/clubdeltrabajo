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

import com.domain.TipoDocumento;
import com.domain.*; // for static metamodels
import com.repository.TipoDocumentoRepository;
import com.service.dto.TipoDocumentoCriteria;

/**
 * Service for executing complex queries for {@link TipoDocumento} entities in the database.
 * The main input is a {@link TipoDocumentoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoDocumento} or a {@link Page} of {@link TipoDocumento} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoDocumentoQueryService extends QueryService<TipoDocumento> {

    private final Logger log = LoggerFactory.getLogger(TipoDocumentoQueryService.class);

    private final TipoDocumentoRepository tipoDocumentoRepository;

    public TipoDocumentoQueryService(TipoDocumentoRepository tipoDocumentoRepository) {
        this.tipoDocumentoRepository = tipoDocumentoRepository;
    }

    /**
     * Return a {@link List} of {@link TipoDocumento} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoDocumento> findByCriteria(TipoDocumentoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoDocumento> specification = createSpecification(criteria);
        return tipoDocumentoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TipoDocumento} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoDocumento> findByCriteria(TipoDocumentoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoDocumento> specification = createSpecification(criteria);
        return tipoDocumentoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoDocumentoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoDocumento> specification = createSpecification(criteria);
        return tipoDocumentoRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoDocumentoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoDocumento> createSpecification(TipoDocumentoCriteria criteria) {
        Specification<TipoDocumento> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoDocumento_.id));
            }
            if (criteria.getNombreTipo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreTipo(), TipoDocumento_.nombreTipo));
            }
        }
        return specification;
    }
}
