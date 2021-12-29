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

import com.domain.CommonMessages;
import com.domain.*; // for static metamodels
import com.repository.CommonMessagesRepository;
import com.service.dto.CommonMessagesCriteria;

/**
 * Service for executing complex queries for {@link CommonMessages} entities in the database.
 * The main input is a {@link CommonMessagesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link CommonMessages} or a {@link Page} of {@link CommonMessages} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CommonMessagesQueryService extends QueryService<CommonMessages> {

    private final Logger log = LoggerFactory.getLogger(CommonMessagesQueryService.class);

    private final CommonMessagesRepository commonMessagesRepository;

    public CommonMessagesQueryService(CommonMessagesRepository commonMessagesRepository) {
        this.commonMessagesRepository = commonMessagesRepository;
    }

    /**
     * Return a {@link List} of {@link CommonMessages} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<CommonMessages> findByCriteria(CommonMessagesCriteria criteria) {
        log.debug("find by criteria0 : {}", criteria);
        final Specification<CommonMessages> specification = createSpecification(criteria);
        return commonMessagesRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link CommonMessages} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CommonMessages> findByCriteria(CommonMessagesCriteria criteria, Pageable page) {
        log.debug("find by criteria1 : {}, page: {}", criteria, page);
        final Specification<CommonMessages> specification = createSpecification(criteria);
        return commonMessagesRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CommonMessagesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<CommonMessages> specification = createSpecification(criteria);
        return commonMessagesRepository.count(specification);
    }

    /**
     * Function to convert {@link CommonMessagesCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<CommonMessages> createSpecification(CommonMessagesCriteria criteria) {
        log.debug("find by criteria000");
        Specification<CommonMessages> specification = Specification.where(null);
        log.debug("find by criteria001");
        if (criteria != null) {
            if (criteria.getId() != null) {
                log.debug("find by criteria002");
                specification = specification.and(buildRangeSpecification(criteria.getId(), CommonMessages_.id));
            }
            if (criteria.getTipoMensaje() != null) {
                log.debug("find by criteria0031 {}",criteria.getTipoMensaje());
                log.debug("find by criteria0032 {}",CommonMessages_.tipoMensaje);
                specification = specification.and(buildStringSpecification(criteria.getTipoMensaje(), CommonMessages_.tipoMensaje));
            }
            if (criteria.getMensajes() != null) {
                log.debug("find by criteria004");
                specification = specification.and(buildStringSpecification(criteria.getMensajes(), CommonMessages_.mensajes));
            }
        }
        log.debug("find by criteria005 : {}", specification);
        return specification;
    }
}
