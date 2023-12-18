package com.web.rest;

import com.service.HelloAnalyticsReporting;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AnalyticsReportingResource {

    public AnalyticsReportingResource(){};

    /**
     * {@code GET  /cargos} : get all the cargos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cargos in body.
     */
    @GetMapping("/users/analytics")
    public String getAnalytics() {
        return HelloAnalyticsReporting.main();
        // return HelloAnalytics.main()
    }
}