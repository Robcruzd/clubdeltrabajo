package com.service;

import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class MapsService {

    @Value("${googleAPIs.geocoding}")
    private String geocodingAPIKey;

    RestTemplate restTemplate = new RestTemplate();

    public String getCoords(String data) {
        
        String baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        String url = baseUrl + data + "&key=" + geocodingAPIKey;

        String response = restTemplate.getForObject(url, String.class);

        return response;
    }
    
}
