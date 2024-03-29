package org.jahr.backend.location.controller;

import lombok.RequiredArgsConstructor;
import org.jahr.backend.location.model.Location;
import org.jahr.backend.location.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/locations")
public class LocationController {
    private final LocationService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Location> getLocations(){
        return service.getLocations();
    }
}
