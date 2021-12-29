package com.web.rest;

import com.domain.CommonMessages;
import com.service.CommonMessagesService;
import com.web.rest.errors.BadRequestAlertException;
import com.service.dto.CommonMessagesCriteria;
import com.service.CommonMessagesQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.domain.CommonMessages}.
 */
@RestController
@RequestMapping("/api")
public class CommonMessagesResource {

    private final Logger log = LoggerFactory.getLogger(CommonMessagesResource.class);

    private static final String ENTITY_NAME = "commonMessages";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommonMessagesService commonMessagesService;

    private final CommonMessagesQueryService commonMessagesQueryService;

    public CommonMessagesResource(CommonMessagesService commonMessagesService, CommonMessagesQueryService commonMessagesQueryService) {
        this.commonMessagesService = commonMessagesService;
        this.commonMessagesQueryService = commonMessagesQueryService;
    }

    /**
     * {@code POST  /commonMessages} : Create a new commonMessages.
     *
     * @param commonMessages the commonMessages to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commonMessages, or with status {@code 400 (Bad Request)} if the commonMessages has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commonMessages")
    public ResponseEntity<CommonMessages> createCommonMessages(@Valid @RequestBody CommonMessages commonMessages) throws URISyntaxException {
        log.debug("REST request to save CommonMessages : {}", commonMessages);
        if (commonMessages.getId() != null) {
            throw new BadRequestAlertException("A new commonMessages cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommonMessages result = commonMessagesService.save(commonMessages);
        return ResponseEntity.created(new URI("/api/commonMessages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commonMessagess} : Updates an existing commonMessages.
     *
     * @param commonMessages the commonMessages to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commonMessages,
     * or with status {@code 400 (Bad Request)} if the commonMessages is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commonMessages couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commonMessages")
    public ResponseEntity<CommonMessages> updateCommonMessages(@Valid @RequestBody CommonMessages commonMessages) throws URISyntaxException {
        log.debug("REST request to update CommonMessages : {}", commonMessages);
        if (commonMessages.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CommonMessages result = commonMessagesService.save(commonMessages);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commonMessages.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commonMessagess} : get all the commonMessagess.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commonMessagess in body.
     */
    @GetMapping("/commonMessages")
    public ResponseEntity<List<CommonMessages>> getAllCommonMessages(CommonMessagesCriteria criteria, Pageable pageable) {
        log.debug("REST request to get CommonMessagess by criteria: {}", criteria);
        Page<CommonMessages> page = commonMessagesQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /commonMessagess/count} : count all the commonMessagess.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/commonMessages/count")
    public ResponseEntity<Long> countCommonMessages(CommonMessagesCriteria criteria) {
        log.debug("REST request to count CommonMessagess by criteria: {}", criteria);
        return ResponseEntity.ok().body(commonMessagesQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /commonMessagess/:id} : get the "id" commonMessages.
     *
     * @param id the id of the commonMessages to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commonMessages, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commonMessages/{id}")
    public ResponseEntity<CommonMessages> getCommonMessages(@PathVariable Long id) {
        log.debug("REST request to get CommonMessages : {}", id);
        Optional<CommonMessages> commonMessages = commonMessagesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commonMessages);
    }

    /**
     * {@code DELETE  /commonMessagess/:id} : delete the "id" commonMessages.
     *
     * @param id the id of the commonMessages to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commonMessages/{id}")
    public ResponseEntity<Void> deleteCommonMessages(@PathVariable Long id) {
        log.debug("REST request to delete CommonMessages : {}", id);
        commonMessagesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
