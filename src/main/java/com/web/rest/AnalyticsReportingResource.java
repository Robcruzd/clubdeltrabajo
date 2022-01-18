package com.web.rest;

import com.service.HelloAnalyticsReporting;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AnalyticsReportingResource {

    public AnalyticsReportingResource(){};

    /**
     * {@code GET  /cargos} : get all the cargos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cargos in body.
     */
    @GetMapping("/users/analytics")
    public String getAnalytics() {
        return HelloAnalyticsReporting.main();
        // return HelloAnalytics.main()
    }
}