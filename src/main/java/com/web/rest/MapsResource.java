package com.web.rest;

import com.service.MapsService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
public class MapsResource {

    private final MapsService mapsService;
    
    public MapsResource(
        MapsService mapsService
    ){
        this.mapsService = mapsService;
    }

    @GetMapping("/maps/getCoords")
    public String getCoords(@RequestParam("data") String data) {
        return mapsService.getCoords(data);
    }
}
