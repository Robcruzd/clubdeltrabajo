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

import com.domain.Empresa;
import com.domain.*; // for static metamodels
import com.repository.EmpresaRepository;
import com.service.dto.EmpresaCriteria;

/**
 * Service for executing complex queries for {@link Empresa} entities in the database.
 * The main input is a {@link EmpresaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Empresa} or a {@link Page} of {@link Empresa} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EmpresaQueryService extends QueryService<Empresa> {

    private final Logger log = LoggerFactory.getLogger(EmpresaQueryService.class);

    private final EmpresaRepository empresaRepository;

    public EmpresaQueryService(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    /**
     * Return a {@link List} of {@link Empresa} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Empresa> findByCriteria(EmpresaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Empresa> specification = createSpecification(criteria);
        return empresaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Empresa} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Empresa> findByCriteria(EmpresaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Empresa> specification = createSpecification(criteria);
        return empresaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EmpresaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Empresa> specification = createSpecification(criteria);
        return empresaRepository.count(specification);
    }

    /**
     * Function to convert {@link EmpresaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Empresa> createSpecification(EmpresaCriteria criteria) {
        Specification<Empresa> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Empresa_.id));
            }
            if (criteria.getRazonSocial() != null) {
                specification = specification.and(buildStringSpecification(criteria.getRazonSocial(), Empresa_.razonSocial));
            }
            if (criteria.getRazonComercial() != null) {
                specification = specification.and(buildStringSpecification(criteria.getRazonComercial(), Empresa_.razonComercial));
            }
            if (criteria.getEmail() != null) {
                specification = specification.and(buildStringSpecification(criteria.getEmail(), Empresa_.email));
            }
            if (criteria.getNumeroDocumentoId() != null) {
                specification = specification.and(buildSpecification(criteria.getNumeroDocumentoId(),
                    root -> root.join(Empresa_.numeroDocumento, JoinType.LEFT).get(Usuario_.id)));
            }
            if (criteria.getTipoUsuarioId() != null) {
                specification = specification.and(buildSpecification(criteria.getTipoUsuarioId(),
                    root -> root.join(Empresa_.tipoUsuario, JoinType.LEFT).get(TipoUsuario_.id)));
            }
            if (criteria.getTipoDocumentoId() != null) {
                specification = specification.and(buildSpecification(criteria.getTipoDocumentoId(),
                    root -> root.join(Empresa_.tipoDocumento, JoinType.LEFT).get(TipoDocumento_.id)));
            }
        }
        return specification;
    }
}
