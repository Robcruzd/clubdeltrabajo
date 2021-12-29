package com.repository;

import com.domain.CommonMessages;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CoommonMessages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommonMessagesRepository extends JpaRepository<CommonMessages, Long>, JpaSpecificationExecutor<CommonMessages> {
}
