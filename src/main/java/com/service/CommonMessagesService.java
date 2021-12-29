package com.service;

import com.domain.CommonMessages;
import com.repository.CommonMessagesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CommonMessages}.
 */
@Service
@Transactional
public class CommonMessagesService {

    private final Logger log = LoggerFactory.getLogger(CommonMessagesService.class);

    private final CommonMessagesRepository commonMessagesRepository;

    public CommonMessagesService(CommonMessagesRepository commonMessagesRepository) {
        this.commonMessagesRepository = commonMessagesRepository;
    }

    /**
     * Save a commonMessages.
     *
     * @param commonMessages the entity to save.
     * @return the persisted entity.
     */
    public CommonMessages save(CommonMessages commonMessages) {
        log.debug("Request to save CommonMessages : {}", commonMessages);
        return commonMessagesRepository.save(commonMessages);
    }

    /**
     * Get all the commonMessagess.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CommonMessages> findAll(Pageable pageable) {
        log.debug("Request to get all CommonMessagess");
        return commonMessagesRepository.findAll(pageable);
    }

    /**
     * Get one commonMessages by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CommonMessages> findOne(Long id) {
        log.debug("Request to get CommonMessages : {}", id);
        return commonMessagesRepository.findById(id);
    }

    /**
     * Delete the commonMessages by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CommonMessages : {}", id);
        commonMessagesRepository.deleteById(id);
    }
}
